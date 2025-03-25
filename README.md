# Sneaker Shop Application

A web application for a sneaker shop built with Vite+React frontend and PHP/MySQL backend.

## Features

- Browse sneakers
- Add sneakers to cart
- User authentication (login/register)
- Place orders
- Admin panel for adding new sneakers

## Tech Stack

- **Frontend**: Vite, React, React Router, Axios
- **Backend**: PHP, MySQL (XAMPP)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [XAMPP](https://www.apachefriends.org/) (for PHP and MySQL)

## Setup Instructions

### 1. Database Setup

1. Start XAMPP and ensure Apache and MySQL services are running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Import the database schema from `api/setup_database.sql`

### 2. Backend Setup

1. Make sure your project is in the XAMPP htdocs directory (e.g., `C:/xampp/htdocs/sneaker-app`)
2. The PHP API is already set up in the `api` directory

### 3. Frontend Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Usage

### Customer

- Browse sneakers on the home page
- Add sneakers to cart
- Register/login to place orders

### Admin

- Login with admin credentials (username: admin, password: admin123)
- Access the admin panel to add new sneakers

## Project Structure

```
sneaker-app/
├── api/                  # PHP backend
│   ├── database.php      # API endpoints
│   └── setup_database.sql # Database schema
├── public/               # Static assets
├── src/                  # React frontend
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable components
│   ├── context/          # React context
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── App.css           # Main CSS
│   ├── App.jsx           # Main component
│   ├── index.css         # Global CSS
│   └── main.jsx          # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

## License

MIT
