-- Create database
CREATE DATABASE IF NOT EXISTS sneaker_shop;
USE sneaker_shop;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sneakers table
CREATE TABLE IF NOT EXISTS sneakers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    release_date DATE,
    colorway VARCHAR(100),
    description TEXT,
    image VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255),
    retail DECIMAL(10, 2),
    resell_price DECIMAL(10, 2),
    popularity INT,
    category VARCHAR(50),
    `condition` VARCHAR(20),
    style VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    sneaker_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (sneaker_id) REFERENCES sneakers(id)
);

-- Insert admin user (password: admin123)
INSERT INTO users (username, password, email, role) 
-- VALUES ('admin', '$2y$10$8MJKwBMFVhD.Nt0JRfGXu.LNw9OoQQcqS9L.hRxcIYSLZlLxzlMPi', 'admin@example.com', 'admin');

-- Insert sneaker data
INSERT INTO sneakers (name, brand, price, release_date, colorway, description, image, thumbnail, retail, resell_price, popularity, category, `condition`, style) VALUES
-- Nike
('Air Jordan 1 Retro High OG', 'Nike', 170.00, '2023-05-15', 'University Blue/White-Black', 'The Air Jordan 1 Retro High OG ''University Blue'' features a University Blue leather upper with black and white accents throughout the shoe.', 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634', 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400', 170.00, 320.00, 98, 'Basketball', 'New', '555088-134'),
('Air Jordan 4 Retro', 'Nike', 210.00, '2023-04-22', 'Thunder', 'The Air Jordan 4 Retro ''Thunder'' 2023 brings back a coveted colorway first released in 2006.', 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b', 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400', 210.00, 290.00, 94, 'Basketball', 'New', 'DH6927-017'),
('Nike Dunk Low', 'Nike', 110.00, '2023-02-10', 'Panda', 'The Nike Dunk Low ''Panda'' features a clean black and white color scheme.', 'https://images.unsplash.com/photo-1605348532760-6753d2c43329', 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400', 110.00, 160.00, 97, 'Skateboarding', 'New', 'DD1391-100'),
('Nike Air Force 1 Low', 'Nike', 100.00, '2023-01-01', 'White', 'The Nike Air Force 1 Low ''White'' is a clean and classic sneaker.', 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28', 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400', 100.00, 100.00, 96, 'Lifestyle', 'New', '315122-111'),
('Nike Air Max 90', 'Nike', 130.00, '2023-03-26', 'Infrared', 'The Nike Air Max 90 ''Infrared'' is an iconic colorway.', 'https://images.unsplash.com/photo-1543508282-6319a3e2621f', 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400', 130.00, 150.00, 91, 'Running', 'New', 'DJ0639-100'),
('Nike Air Max 95', 'Nike', 175.00, '2023-06-15', 'Neon', 'The Nike Air Max 95 ''Neon'' features the iconic gradient design.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 175.00, 200.00, 89, 'Running', 'New', 'DM9104-002'),
('Nike SB Dunk High', 'Nike', 120.00, '2023-07-01', 'Hawaii', 'The Nike SB Dunk High ''Hawaii'' features tropical-inspired graphics.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 120.00, 250.00, 92, 'Skateboarding', 'New', 'CZ2232-300'),
('Nike Blazer Mid ''77', 'Nike', 100.00, '2023-02-20', 'Vintage White/Black', 'The Nike Blazer Mid ''77 features a vintage-inspired design.', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', 100.00, 110.00, 88, 'Basketball', 'New', 'BQ6806-100'),
('Nike Air Presto', 'Nike', 130.00, '2023-08-10', 'Triple Black', 'The Nike Air Presto ''Triple Black'' offers sleek style and comfort.', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 130.00, 150.00, 87, 'Running', 'New', 'CT3550-003'),
('Nike React Element 87', 'Nike', 160.00, '2023-09-01', 'Light Bone', 'The Nike React Element 87 features translucent upper and React cushioning.', 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b', 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=400', 160.00, 200.00, 86, 'Lifestyle', 'New', 'AQ1090-100'),

-- Adidas
('Yeezy Boost 350 V2', 'Adidas', 220.00, '2022-12-03', 'Beluga Reflective', 'The adidas Yeezy Boost 350 V2 features reflective threading.', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400', 220.00, 380.00, 95, 'Lifestyle', 'New', 'GW1229'),
('Adidas Ultraboost 22', 'Adidas', 190.00, '2022-12-15', 'Core Black', 'The Adidas Ultraboost 22 features Primeknit upper and Boost midsole.', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', 190.00, 190.00, 88, 'Running', 'New', 'GX3062'),
('Adidas NMD R1', 'Adidas', 140.00, '2023-02-15', 'Core Black/White', 'The Adidas NMD R1 features Boost cushioning.', 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb', 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400', 140.00, 160.00, 86, 'Lifestyle', 'New', 'GZ9256'),
('Adidas Forum Low', 'Adidas', 100.00, '2023-05-20', 'Cloud White', 'The Adidas Forum Low is a classic basketball silhouette.', 'https://images.unsplash.com/photo-1603808033176-9d134e6f2c74', 'https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?w=400', 100.00, 120.00, 85, 'Basketball', 'New', 'FY7756'),
('Adidas Superstar', 'Adidas', 90.00, '2023-03-15', 'White/Black', 'The Adidas Superstar is an iconic shell-toe sneaker.', 'https://images.unsplash.com/photo-1603808033192-082198c7622e', 'https://images.unsplash.com/photo-1603808033192-082198c7622e?w=400', 90.00, 90.00, 89, 'Lifestyle', 'New', 'EG4958'),
('Adidas Stan Smith', 'Adidas', 85.00, '2023-04-01', 'White/Green', 'The Adidas Stan Smith is a tennis classic.', 'https://images.unsplash.com/photo-1603808033176-9d134e6f2c74', 'https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?w=400', 85.00, 85.00, 87, 'Lifestyle', 'New', 'FX5502'),
('Adidas Samba', 'Adidas', 80.00, '2023-06-10', 'Black/White', 'The Adidas Samba is a soccer-inspired classic.', 'https://images.unsplash.com/photo-1603808033176-9d134e6f2c74', 'https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?w=400', 80.00, 100.00, 93, 'Soccer', 'New', '019000'),
('Adidas ZX 750', 'Adidas', 95.00, '2023-07-15', 'Navy/Grey', 'The Adidas ZX 750 is a retro running shoe.', 'https://images.unsplash.com/photo-1603808033176-9d134e6f2c74', 'https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?w=400', 95.00, 95.00, 82, 'Running', 'New', 'FX7471'),

-- New Balance
('New Balance 550', 'New Balance', 120.00, '2023-01-20', 'White/Green', 'The New Balance 550 is a retro basketball silhouette.', 'https://images.unsplash.com/photo-1539185441755-769473a23570', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', 120.00, 140.00, 90, 'Basketball', 'New', 'BB550WT1'),
('New Balance 990v5', 'New Balance', 185.00, '2023-04-01', 'Grey', 'The New Balance 990v5 is made in the USA.', 'https://images.unsplash.com/photo-1539185441755-769473a23570', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', 185.00, 200.00, 89, 'Running', 'New', 'M990GL5'),
('New Balance 2002R', 'New Balance', 140.00, '2023-08-01', 'Protection Pack Grey', 'The New Balance 2002R features a deconstructed design.', 'https://images.unsplash.com/photo-1539185441755-769473a23570', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', 140.00, 200.00, 91, 'Lifestyle', 'New', 'M2002RDB'),
('New Balance 327', 'New Balance', 100.00, '2023-05-15', 'Natural Indigo', 'The New Balance 327 offers retro-inspired style.', 'https://images.unsplash.com/photo-1539185441755-769473a23570', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', 100.00, 120.00, 88, 'Lifestyle', 'New', 'MS327LB1'),
('New Balance 574', 'New Balance', 80.00, '2023-03-20', 'Navy', 'The New Balance 574 is a classic lifestyle shoe.', 'https://images.unsplash.com/photo-1539185441755-769473a23570', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', 80.00, 80.00, 85, 'Lifestyle', 'New', 'ML574EVN'),

-- Puma
('Puma Suede Classic', 'Puma', 70.00, '2023-01-10', 'Black/White', 'The Puma Suede Classic is a timeless sneaker.', 'https://images.unsplash.com/photo-1608379743498-63cc1e39b27d', 'https://images.unsplash.com/photo-1608379743498-63cc1e39b27d?w=400', 70.00, 70.00, 82, 'Lifestyle', 'New', '352634-03'),
('Puma RS-X', 'Puma', 110.00, '2023-06-01', 'White/Red', 'The Puma RS-X features bold chunky design.', 'https://images.unsplash.com/photo-1608379743498-63cc1e39b27d', 'https://images.unsplash.com/photo-1608379743498-63cc1e39b27d?w=400', 110.00, 130.00, 84, 'Lifestyle', 'New', '374519-01'),
('Puma Future Rider', 'Puma', 85.00, '2023-07-10', 'Yellow/Black', 'The Puma Future Rider offers retro running style.', 'https://images.unsplash.com/photo-1608379743498-63cc1e39b27d', 'https://images.unsplash.com/photo-1608379743498-63cc1e39b27d?w=400', 85.00, 85.00, 81, 'Running', 'New', '375971-01'),
('Puma Clyde', 'Puma', 80.00, '2023-04-15', 'White/Navy', 'The Puma Clyde is a basketball legend.', 'https://images.unsplash.com/photo-1608379743498-63cc1e39b27d', 'https://images.unsplash.com/photo-1608379743498-63cc1e39b27d?w=400', 80.00, 90.00, 83, 'Basketball', 'New', '380784-01'),

-- Reebok
('Reebok Club C 85', 'Reebok', 80.00, '2023-01-05', 'White/Green', 'The Reebok Club C 85 is a tennis classic.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 80.00, 90.00, 84, 'Lifestyle', 'New', 'AR0456'),
('Reebok Question Mid', 'Reebok', 150.00, '2023-08-15', 'Red Toe', 'The Reebok Question Mid is Allen Iverson''s signature shoe.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 150.00, 200.00, 88, 'Basketball', 'New', 'GY1024'),
('Reebok Classic Leather', 'Reebok', 75.00, '2023-05-01', 'White', 'The Reebok Classic Leather is a timeless design.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 75.00, 75.00, 83, 'Lifestyle', 'New', '49797'),

-- ASICS
('ASICS Gel-Lyte III', 'ASICS', 120.00, '2023-05-01', 'Monaco Blue', 'The ASICS Gel-Lyte III features split tongue design.', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', 120.00, 140.00, 85, 'Running', 'New', '1201A081-400'),
('ASICS Gel-Kayano 29', 'ASICS', 160.00, '2023-07-20', 'Black/White', 'The ASICS Gel-Kayano 29 offers premium running performance.', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', 160.00, 160.00, 86, 'Running', 'New', '1011B405-001'),
('ASICS Novablast 3', 'ASICS', 140.00, '2023-06-15', 'Digital Aqua', 'The ASICS Novablast 3 features FF BLAST PLUS cushioning.', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', 140.00, 140.00, 84, 'Running', 'New', '1011B308-400'),

-- Converse
('Converse Chuck 70 Hi', 'Converse', 85.00, '2023-02-01', 'Black', 'The Converse Chuck 70 Hi is a premium version of the Chuck Taylor.', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400', 85.00, 85.00, 87, 'Lifestyle', 'New', '162050C'),
('Converse One Star', 'Converse', 75.00, '2023-04-10', 'Green/White', 'The Converse One Star is a skateboarding icon.', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400', 75.00, 90.00, 83, 'Skateboarding', 'New', '165033C'),
('Converse Run Star Hike', 'Converse', 110.00, '2023-06-20', 'Black/White', 'The Converse Run Star Hike features platform sole.', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400', 110.00, 130.00, 89, 'Lifestyle', 'New', '166800C'),

-- Vans
('Vans Old Skool', 'Vans', 70.00, '2023-02-01', 'Black/White', 'The Vans Old Skool is a classic skate shoe.', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 70.00, 70.00, 87, 'Skateboarding', 'New', 'VN000D3HY28'),
('Vans Sk8-Hi', 'Vans', 75.00, '2023-03-15', 'Navy', 'The Vans Sk8-Hi is a high-top skate classic.', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 75.00, 75.00, 86, 'Skateboarding', 'New', 'VN000D5INVY'),
('Vans Authentic', 'Vans', 60.00, '2023-05-01', 'Red', 'The Vans Authentic is the original Vans style.', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 60.00, 60.00, 85, 'Skateboarding', 'New', 'VN000EE3RED'),

-- Under Armour
('Under Armour Curry 10', 'Under Armour', 160.00, '2023-09-15', 'White/Blue', 'The Under Armour Curry 10 is Stephen Curry''s signature shoe.', 'https://example.com/curry10.jpg', 'https://example.com/curry10_thumb.jpg', 160.00, 180.00, 88, 'Basketball', 'New', '3025622-100'),
('Under Armour HOVR Phantom 3', 'Under Armour', 140.00, '2023-08-01', 'Black/Grey', 'The Under Armour HOVR Phantom 3 features HOVR cushioning.', 'https://example.com/phantom3.jpg', 'https://example.com/phantom3_thumb.jpg', 140.00, 140.00, 84, 'Running', 'New', '3024952-001'),

-- Saucony
('Saucony Jazz Original', 'Saucony', 65.00, '2023-03-01', 'Grey/Blue', 'The Saucony Jazz Original is a retro running classic.', 'https://example.com/jazz.jpg', 'https://example.com/jazz_thumb.jpg', 65.00, 65.00, 81, 'Lifestyle', 'New', 'S2044-607'),
('Saucony Endorphin Speed 3', 'Saucony', 170.00, '2023-07-01', 'Orange/Black', 'The Saucony Endorphin Speed 3 is a performance running shoe.', 'https://example.com/endorphin.jpg', 'https://example.com/endorphin_thumb.jpg', 170.00, 170.00, 87, 'Running', 'New', 'S20755-65'),

-- Jordan Brand
('Air Jordan 11 Retro', 'Nike', 225.00, '2022-12-10', 'Cherry', 'The Air Jordan 11 Retro features patent leather design.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 225.00, 300.00, 93, 'Basketball', 'New', 'CT8012-116'),
('Air Jordan 3 Retro', 'Nike', 200.00, '2023-07-15', 'White Cement', 'The Air Jordan 3 Retro features elephant print details.', 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717', 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=400', 200.00, 280.00, 92, 'Basketball', 'New', 'DN3707-100'),
('Air Jordan 5 Retro', 'Nike', 200.00, '2023-09-02', 'Fire Red', 'The Air Jordan 5 Retro features reflective tongue.', 'https://example.com/aj5.jpg', 'https://example.com/aj5_thumb.jpg', 200.00, 250.00, 91, 'Basketball', 'New', 'DA1911-102'),
('Air Jordan 6 Retro', 'Nike', 200.00, '2023-08-12', 'Carmine', 'The Air Jordan 6 Retro in iconic Carmine colorway.', 'https://example.com/aj6.jpg', 'https://example.com/aj6_thumb.jpg', 200.00, 240.00, 90, 'Basketball', 'New', 'CT8529-106'); 