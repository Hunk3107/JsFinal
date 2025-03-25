<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$host = 'localhost';
$dbname = 'sneaker_shop';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            // Lấy danh sách sản phẩm
            if (isset($_GET['id'])) {
                // Lấy chi tiết một sản phẩm
                $stmt = $pdo->prepare("SELECT * FROM sneakers WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                $sneaker = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($sneaker) {
                    echo json_encode($sneaker);
                } else {
                    echo json_encode(['error' => 'Sneaker not found']);
                }
            } else if (isset($_GET['brand'])) {
                // Lọc theo thương hiệu
                $stmt = $pdo->prepare("SELECT * FROM sneakers WHERE brand = ?");
                $stmt->execute([$_GET['brand']]);
                $sneakers = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($sneakers);
            } else if (isset($_GET['category'])) {
                // Lọc theo danh mục
                $stmt = $pdo->prepare("SELECT * FROM sneakers WHERE category = ?");
                $stmt->execute([$_GET['category']]);
                $sneakers = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($sneakers);
            } else {
                // Lấy tất cả sản phẩm
                $stmt = $pdo->prepare("SELECT * FROM sneakers");
                $stmt->execute();
                $sneakers = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($sneakers);
            }
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (isset($data['action'])) {
                if ($data['action'] === 'place_order') {
                    // Đặt hàng
                    session_start();
                    if (!isset($_SESSION['user_id'])) {
                        echo json_encode(['error' => 'Please login first']);
                        exit;
                    }

                    $user_id = $_SESSION['user_id'];
                    $cart = $data['cart'];
                    $total = array_reduce($cart, fn($sum, $item) => $sum + ($item['price'] * $item['quantity']), 0);

                    $pdo->beginTransaction();
                    $stmt = $pdo->prepare("INSERT INTO orders (user_id, total_price) VALUES (?, ?)");
                    $stmt->execute([$user_id, $total]);
                    $order_id = $pdo->lastInsertId();

                    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, sneaker_id, quantity, price) VALUES (?, ?, ?, ?)");
                    foreach ($cart as $item) {
                        $stmt->execute([$order_id, $item['id'], $item['quantity'], $item['price']]);
                    }
                    $pdo->commit();
                    echo json_encode(['success' => 'Order placed successfully']);
                } elseif ($data['action'] === 'login') {
                    // Đăng nhập
                    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
                    $stmt->execute([$data['username']]);
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                    if ($user && password_verify($data['password'], $user['password'])) {
                        session_start();
                        $_SESSION['user_id'] = $user['id'];
                        $_SESSION['role'] = $user['role'];
                        echo json_encode([
                            'success' => 'Login successful', 
                            'role' => $user['role'],
                            'user_id' => $user['id']
                        ]);
                    } else {
                        echo json_encode(['error' => 'Invalid credentials']);
                    }
                } elseif ($data['action'] === 'register') {
                    // Đăng ký tài khoản
                    // Kiểm tra xem username đã tồn tại chưa
                    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
                    $stmt->execute([$data['username']]);
                    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                    if ($existingUser) {
                        echo json_encode(['error' => 'Username already exists']);
                        exit;
                    }
                    
                    // Mã hóa mật khẩu
                    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
                    
                    // Thêm người dùng mới
                    $stmt = $pdo->prepare("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, 'user')");
                    $stmt->execute([$data['username'], $hashedPassword, $data['email']]);
                    
                    echo json_encode(['success' => 'Registration successful']);
                } elseif ($data['action'] === 'add_sneaker') {
                    // Thêm sản phẩm (chỉ admin)
                    session_start();
                    if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
                        echo json_encode(['error' => 'Unauthorized access']);
                        exit;
                    }
                    
                    $stmt = $pdo->prepare("
                        INSERT INTO sneakers (
                            name, brand, price, release_date, colorway, description, 
                            image, thumbnail, retail, resell_price, popularity, 
                            category, `condition`, style
                        ) VALUES (
                            :name, :brand, :price, :release_date, :colorway, :description, 
                            :image, :image, :price, :resell_price, :popularity, 
                            :category, :condition, :style
                        )
                    ");
                    
                    $stmt->execute([
                        ':name' => $data['name'],
                        ':brand' => $data['brand'],
                        ':price' => $data['price'],
                        ':release_date' => $data['release_date'] ?? null,
                        ':colorway' => $data['colorway'] ?? null,
                        ':description' => $data['description'] ?? null,
                        ':image' => $data['image'],
                        ':resell_price' => $data['resell_price'] ?? $data['price'],
                        ':popularity' => $data['popularity'] ?? 80,
                        ':category' => $data['category'] ?? null,
                        ':condition' => $data['condition'] ?? 'New',
                        ':style' => $data['style'] ?? null
                    ]);
                    
                    echo json_encode(['success' => 'Sneaker added successfully']);
                }
            }
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>