
-- Fuel Transport Tracking System Database Schema
-- Database: fuel_transport_tracking

-- Create database
CREATE DATABASE IF NOT EXISTS fuel_transport_tracking;
USE fuel_transport_tracking;

-- =============================================
-- 1. USERS TABLE
-- =============================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('driver', 'supervisor', 'fuelman', 'glpama', 'admin') NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- 2. TRANSPORT RECORDS TABLE
-- =============================================
CREATE TABLE transport_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    unit_number VARCHAR(20) NOT NULL,
    driver_name VARCHAR(100) NOT NULL,
    driver_id INT,
    supervisor_id INT,
    fuelman_id INT,
    status ENUM('created', 'loading_start', 'loading_complete', 'en_route', 'arrived', 'unloading_start', 'unloading_complete', 'completed') DEFAULT 'created',
    origin_terminal VARCHAR(100),
    destination_depot VARCHAR(100),
    fuel_type VARCHAR(50),
    planned_volume DECIMAL(10,2),
    actual_volume DECIMAL(10,2),
    loading_start_time TIMESTAMP NULL,
    loading_end_time TIMESTAMP NULL,
    departure_time TIMESTAMP NULL,
    arrival_time TIMESTAMP NULL,
    unloading_start_time TIMESTAMP NULL,
    unloading_end_time TIMESTAMP NULL,
    seal_number VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id),
    FOREIGN KEY (supervisor_id) REFERENCES users(id),
    FOREIGN KEY (fuelman_id) REFERENCES users(id)
);

-- =============================================
-- 3. CHECKPOINTS TABLE (GPS Tracking)
-- =============================================
CREATE TABLE checkpoints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    checkpoint_type ENUM('depart_terminal', 'en_route', 'arrive_depot', 'custom') NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photo_url VARCHAR(500),
    notes TEXT,
    created_by INT,
    FOREIGN KEY (transport_id) REFERENCES transport_records(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- =============================================
-- 4. DOCUMENTS TABLE
-- =============================================
CREATE TABLE documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    doc_type ENUM('delivery_order', 'surat_jalan', 'seal_photo', 'color_sample', 'other') NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    uploaded_by INT,
    upload_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transport_id) REFERENCES transport_records(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- =============================================
-- 5. FUEL QUALITY TABLE
-- =============================================
CREATE TABLE fuel_quality (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    density DECIMAL(6,3), -- kg/m3
    temperature DECIMAL(5,2), -- Celsius
    fame_percentage DECIMAL(5,2), -- FAME %
    clarity_rating ENUM('clear', 'slightly_cloudy', 'cloudy', 'very_cloudy'),
    clarity_photo_url VARCHAR(500),
    color_sample_photo_url VARCHAR(500),
    viscosity DECIMAL(8,3), -- Optional
    flash_point DECIMAL(5,1), -- Optional
    tested_by INT,
    test_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (transport_id) REFERENCES transport_records(id) ON DELETE CASCADE,
    FOREIGN KEY (tested_by) REFERENCES users(id)
);

-- =============================================
-- 6. FLOW METER TABLE
-- =============================================
CREATE TABLE flow_meter (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    flow_meter_name VARCHAR(100) NOT NULL,
    flow_meter_serial VARCHAR(50),
    reading_initial DECIMAL(12,3) NOT NULL,
    reading_final DECIMAL(12,3) NOT NULL,
    calculated_volume DECIMAL(12,3) GENERATED ALWAYS AS (reading_final - reading_initial) STORED,
    calibration_factor DECIMAL(8,6) DEFAULT 1.000000,
    temperature_compensation DECIMAL(5,2),
    recorded_by INT,
    record_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (transport_id) REFERENCES transport_records(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES users(id)
);

-- =============================================
-- 7. ACTIVITY LOGS TABLE (Audit Trail)
-- =============================================
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transport_id) REFERENCES transport_records(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =============================================
-- 8. MASTER DATA - TERMINALS
-- =============================================
CREATE TABLE terminals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    terminal_code VARCHAR(20) UNIQUE NOT NULL,
    terminal_name VARCHAR(100) NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 9. MASTER DATA - DEPOTS
-- =============================================
CREATE TABLE depots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    depot_code VARCHAR(20) UNIQUE NOT NULL,
    depot_name VARCHAR(100) NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX idx_transport_records_status ON transport_records(status);
CREATE INDEX idx_transport_records_unit_number ON transport_records(unit_number);
CREATE INDEX idx_transport_records_created_at ON transport_records(created_at);
CREATE INDEX idx_checkpoints_transport_id ON checkpoints(transport_id);
CREATE INDEX idx_documents_transport_id ON documents(transport_id);
CREATE INDEX idx_fuel_quality_transport_id ON fuel_quality(transport_id);
CREATE INDEX idx_flow_meter_transport_id ON flow_meter(transport_id);
CREATE INDEX idx_activity_logs_transport_id ON activity_logs(transport_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Insert sample users
INSERT INTO users (username, password, role, fullname, email, phone) VALUES
('driver1', '$2b$10$hashedpassword1', 'driver', 'John Driver', 'john.driver@company.com', '+62812345001'),
('driver2', '$2b$10$hashedpassword2', 'driver', 'Mike Transport', 'mike.transport@company.com', '+62812345002'),
('supervisor1', '$2b$10$hashedpassword3', 'supervisor', 'Jane Supervisor', 'jane.supervisor@company.com', '+62812345003'),
('fuelman1', '$2b$10$hashedpassword4', 'fuelman', 'Bob Fuelman', 'bob.fuelman@company.com', '+62812345004'),
('fuelman2', '$2b$10$hashedpassword5', 'fuelman', 'Tom Quality', 'tom.quality@company.com', '+62812345005'),
('glpama1', '$2b$10$hashedpassword6', 'glpama', 'Sarah PAMA', 'sarah.pama@pama.gov.id', '+62812345006'),
('admin1', '$2b$10$hashedpassword7', 'admin', 'Admin User', 'admin@company.com', '+62812345007');

-- Insert sample terminals
INSERT INTO terminals (terminal_code, terminal_name, address, latitude, longitude, contact_person, phone) VALUES
('TRM001', 'Jakarta Terminal', 'Jl. Raya Jakarta No. 123, Jakarta', -6.2088, 106.8456, 'Agus Terminal', '+62812345101'),
('TRM002', 'Surabaya Terminal', 'Jl. Industrial Surabaya No. 456, Surabaya', -7.2504, 112.7688, 'Budi Terminal', '+62812345102'),
('TRM003', 'Medan Terminal', 'Jl. Pelabuhan Medan No. 789, Medan', 3.5952, 98.6722, 'Citra Terminal', '+62812345103');

-- Insert sample depots
INSERT INTO depots (depot_code, depot_name, address, latitude, longitude, contact_person, phone) VALUES
('DEP001', 'Bandung Depot', 'Jl. Raya Bandung No. 321, Bandung', -6.9175, 107.6191, 'Dedi Depot', '+62812345201'),
('DEP002', 'Yogyakarta Depot', 'Jl. Ring Road Yogya No. 654, Yogyakarta', -7.7956, 110.3695, 'Eko Depot', '+62812345202'),
('DEP003', 'Semarang Depot', 'Jl. Industrial Semarang No. 987, Semarang', -6.9931, 110.4203, 'Fajar Depot', '+62812345203');

-- Insert sample transport records
INSERT INTO transport_records (unit_number, driver_name, driver_id, supervisor_id, status, origin_terminal, destination_depot, fuel_type, planned_volume, loading_start_time, seal_number) VALUES
('FT-001', 'John Driver', 1, 3, 'loading_complete', 'Jakarta Terminal', 'Bandung Depot', 'Solar B30', 15000.00, '2024-01-15 08:00:00', 'SEAL001'),
('FT-002', 'Mike Transport', 2, 3, 'en_route', 'Surabaya Terminal', 'Yogyakarta Depot', 'Pertalite', 12000.00, '2024-01-15 09:30:00', 'SEAL002'),
('FT-003', 'John Driver', 1, 3, 'arrived', 'Jakarta Terminal', 'Semarang Depot', 'Pertamax', 18000.00, '2024-01-14 14:00:00', 'SEAL003');

-- Insert sample checkpoints
INSERT INTO checkpoints (transport_id, checkpoint_type, latitude, longitude, address, created_by) VALUES
(1, 'depart_terminal', -6.2088, 106.8456, 'Jakarta Terminal', 1),
(1, 'en_route', -6.4025, 106.7942, 'Rest Area KM 25', 1),
(2, 'depart_terminal', -7.2504, 112.7688, 'Surabaya Terminal', 2),
(3, 'depart_terminal', -6.2088, 106.8456, 'Jakarta Terminal', 1),
(3, 'arrive_depot', -6.9931, 110.4203, 'Semarang Depot', 1);

-- Insert sample fuel quality data
INSERT INTO fuel_quality (transport_id, density, temperature, fame_percentage, clarity_rating, tested_by) VALUES
(1, 845.5, 28.5, 30.2, 'clear', 4),
(3, 751.2, 29.1, 0.0, 'clear', 5);

-- Insert sample flow meter readings
INSERT INTO flow_meter (transport_id, flow_meter_name, flow_meter_serial, reading_initial, reading_final, recorded_by) VALUES
(1, 'FM-Terminal-01', 'FM001234', 125430.500, 140430.500, 4),
(3, 'FM-Terminal-02', 'FM001235', 98750.250, 116750.250, 5);

-- Insert sample documents
INSERT INTO documents (transport_id, doc_type, file_name, file_url, uploaded_by) VALUES
(1, 'delivery_order', 'DO_FT001_20240115.pdf', '/uploads/documents/DO_FT001_20240115.pdf', 1),
(1, 'seal_photo', 'seal_FT001.jpg', '/uploads/photos/seal_FT001.jpg', 3),
(2, 'surat_jalan', 'SJ_FT002_20240115.pdf', '/uploads/documents/SJ_FT002_20240115.pdf', 2),
(3, 'color_sample', 'color_sample_FT003.jpg', '/uploads/photos/color_sample_FT003.jpg', 5);

-- =============================================
-- VIEWS FOR REPORTING
-- =============================================

-- Transport Summary View
CREATE VIEW transport_summary AS
SELECT 
    tr.id,
    tr.unit_number,
    tr.driver_name,
    tr.status,
    tr.origin_terminal,
    tr.destination_depot,
    tr.fuel_type,
    tr.planned_volume,
    tr.actual_volume,
    fm.calculated_volume,
    tr.loading_start_time,
    tr.unloading_end_time,
    TIMESTAMPDIFF(HOUR, tr.loading_start_time, tr.unloading_end_time) as total_hours,
    fq.density,
    fq.temperature,
    fq.fame_percentage,
    COUNT(d.id) as document_count,
    COUNT(c.id) as checkpoint_count
FROM transport_records tr
LEFT JOIN flow_meter fm ON tr.id = fm.transport_id
LEFT JOIN fuel_quality fq ON tr.id = fq.transport_id
LEFT JOIN documents d ON tr.id = d.transport_id
LEFT JOIN checkpoints c ON tr.id = c.transport_id
GROUP BY tr.id;

-- Daily Transport Report View
CREATE VIEW daily_transport_report AS
SELECT 
    DATE(created_at) as transport_date,
    COUNT(*) as total_transports,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_transports,
    COUNT(CASE WHEN status IN ('en_route', 'arrived', 'unloading_start') THEN 1 END) as in_progress_transports,
    SUM(planned_volume) as total_planned_volume,
    SUM(actual_volume) as total_actual_volume,
    AVG(TIMESTAMPDIFF(HOUR, loading_start_time, unloading_end_time)) as avg_delivery_hours
FROM transport_records
WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY DATE(created_at)
ORDER BY transport_date DESC;

-- =============================================
-- STORED PROCEDURES
-- =============================================

DELIMITER //

-- Procedure to update transport status
CREATE PROCEDURE UpdateTransportStatus(
    IN p_transport_id INT,
    IN p_new_status VARCHAR(50),
    IN p_user_id INT,
    IN p_notes TEXT
)
BEGIN
    DECLARE old_status VARCHAR(50);
    
    -- Get current status
    SELECT status INTO old_status FROM transport_records WHERE id = p_transport_id;
    
    -- Update status
    UPDATE transport_records 
    SET status = p_new_status, 
        updated_at = CURRENT_TIMESTAMP,
        notes = COALESCE(p_notes, notes)
    WHERE id = p_transport_id;
    
    -- Log the activity
    INSERT INTO activity_logs (transport_id, user_id, action, description, old_values, new_values)
    VALUES (p_transport_id, p_user_id, 'status_update', 
            CONCAT('Status changed from ', old_status, ' to ', p_new_status),
            JSON_OBJECT('status', old_status),
            JSON_OBJECT('status', p_new_status));
END //

DELIMITER ;

-- =============================================
-- TRIGGERS
-- =============================================

DELIMITER //

-- Trigger to automatically calculate actual volume from flow meter
CREATE TRIGGER calculate_actual_volume 
AFTER INSERT ON flow_meter
FOR EACH ROW
BEGIN
    UPDATE transport_records 
    SET actual_volume = NEW.calculated_volume
    WHERE id = NEW.transport_id;
END //

-- Trigger to log all transport record changes
CREATE TRIGGER log_transport_changes
AFTER UPDATE ON transport_records
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (transport_id, action, description, old_values, new_values)
    VALUES (NEW.id, 'record_update', 'Transport record updated',
            JSON_OBJECT('status', OLD.status, 'updated_at', OLD.updated_at),
            JSON_OBJECT('status', NEW.status, 'updated_at', NEW.updated_at));
END //

DELIMITER ;

-- =============================================
-- SAMPLE QUERIES FOR TESTING
-- =============================================

-- Get all active transports with their current status
-- SELECT * FROM transport_summary WHERE status != 'completed';

-- Get transport history for a specific driver
-- SELECT * FROM transport_records WHERE driver_name = 'John Driver' ORDER BY created_at DESC;

-- Get fuel quality statistics
-- SELECT 
--     fuel_type,
--     AVG(density) as avg_density,
--     AVG(temperature) as avg_temperature,
--     AVG(fame_percentage) as avg_fame
-- FROM transport_records tr
-- JOIN fuel_quality fq ON tr.id = fq.transport_id
-- GROUP BY fuel_type;

-- Get daily performance report
-- SELECT * FROM daily_transport_report ORDER BY transport_date DESC LIMIT 7;

COMMIT;
