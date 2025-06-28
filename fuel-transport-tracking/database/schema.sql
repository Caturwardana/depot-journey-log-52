
-- Create database
CREATE DATABASE IF NOT EXISTS fuel_transport_tracking;
USE fuel_transport_tracking;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    role ENUM('driver', 'supervisor', 'fuelman', 'glpama', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Depots table
CREATE TABLE depots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    capacity DECIMAL(10,2),
    manager_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (manager_id) REFERENCES users(id)
);

-- Terminals table
CREATE TABLE terminals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    capacity DECIMAL(10,2),
    depot_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (depot_id) REFERENCES depots(id)
);

-- Transports table
CREATE TABLE transports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    unit_number VARCHAR(50) NOT NULL,
    driver_id INT NOT NULL,
    depot_id INT,
    terminal_id INT,
    destination VARCHAR(255) NOT NULL,
    fuel_type ENUM('gasoline', 'diesel', 'kerosene') NOT NULL,
    volume DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'in_transit', 'arrived', 'unloading', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id),
    FOREIGN KEY (depot_id) REFERENCES depots(id),
    FOREIGN KEY (terminal_id) REFERENCES terminals(id)
);

-- Checkpoints table
CREATE TABLE checkpoints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    image_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transport_id) REFERENCES transports(id) ON DELETE CASCADE
);

-- Documents table
CREATE TABLE documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    document_type ENUM('seal_photo', 'loading_doc', 'delivery_doc', 'quality_cert', 'other') NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INT,
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transport_id) REFERENCES transports(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Flow Meter table
CREATE TABLE flow_meters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    meter_id VARCHAR(50) NOT NULL,
    initial_reading DECIMAL(10,3),
    final_reading DECIMAL(10,3),
    volume_dispensed DECIMAL(10,3),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recorded_by INT,
    notes TEXT,
    FOREIGN KEY (transport_id) REFERENCES transports(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES users(id)
);

-- Fuel Quality table
CREATE TABLE fuel_quality (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    temperature DECIMAL(5,2),
    density DECIMAL(6,4),
    clarity ENUM('clear', 'slightly_cloudy', 'cloudy', 'contaminated') DEFAULT 'clear',
    water_content DECIMAL(5,4),
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tested_by INT,
    notes TEXT,
    image_path VARCHAR(500),
    FOREIGN KEY (transport_id) REFERENCES transports(id) ON DELETE CASCADE,
    FOREIGN KEY (tested_by) REFERENCES users(id)
);

-- Activity Logs table
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transport_id) REFERENCES transports(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert default users
INSERT INTO users (username, password, fullname, role) VALUES
('driver1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John Driver', 'driver'),
('supervisor1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane Supervisor', 'supervisor'),
('fuelman1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mike Fuelman', 'fuelman'),
('glpama1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah PAMA', 'glpama'),
('admin1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin');

-- Insert sample depots
INSERT INTO depots (name, location, capacity, manager_id) VALUES
('Depot Jakarta', 'Jakarta Utara', 50000.00, 2),
('Depot Surabaya', 'Surabaya Timur', 35000.00, 2),
('Depot Medan', 'Medan Kota', 40000.00, 2);

-- Insert sample terminals
INSERT INTO terminals (name, location, capacity, depot_id) VALUES
('Terminal A Jakarta', 'Tanjung Priok', 10000.00, 1),
('Terminal B Jakarta', 'Pluit', 8000.00, 1),
('Terminal A Surabaya', 'Pelabuhan Tanjung Perak', 12000.00, 2);
