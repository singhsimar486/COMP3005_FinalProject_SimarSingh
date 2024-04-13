CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Members (
    member_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    phonenumber VARCHAR(15),
    address TEXT,
    gender VARCHAR(10),
    fitnessgoal TEXT,
    height DECIMAL(5, 2),
    weight DECIMAL(5, 2),
    email VARCHAR(100) NOT NULL
);

CREATE TABLE Trainer (
	trainer_id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	gender VARCHAR(10),
	age INT,
	Avaliable_Days VARCHAR(50),
	Start_Time TIME,
	End_Time TIME,
	email VARCHAR(100) NOT NULL
);

CREATE TABLE PT_Sessions (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER,
    member_id INTEGER,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    CONSTRAINT fk_trainer FOREIGN KEY (trainer_id) REFERENCES Trainer(trainer_id) ON DELETE CASCADE,
    CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES Members(member_id) ON DELETE CASCADE
);

CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL 
);

CREATE TABLE Rooms (
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    capacity INTEGER,
    amenities TEXT,
    availability BOOLEAN DEFAULT TRUE
);

CREATE TABLE Bookings (
    booking_id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES Rooms(room_id),
    user_id INTEGER REFERENCES Users(user_id), 
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

CREATE TABLE EquipmentMaintenance (
    equipment_id SERIAL PRIMARY KEY,
    equipment_name VARCHAR(255) NOT NULL,
    equipment_type VARCHAR(100),
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    maintenance_notes TEXT,
    maintenance_status VARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE ClassSchedule (
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL,
    trainer_name VARCHAR(255) NOT NULL,
    class_description TEXT,
    class_schedule JSONB,
    class_location VARCHAR(100),
    class_capacity INTEGER,
    registration_link VARCHAR(255),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Billing (
    bill_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    invoice_number VARCHAR(50) UNIQUE,
    billing_date DATE,
    due_date DATE,
    amount_due DECIMAL(10, 2),
    amount_paid DECIMAL(10, 2),
    payment_date DATE,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);