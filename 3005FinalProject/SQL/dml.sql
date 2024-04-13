-- -- Sample data for Users table
-- INSERT INTO Users (username, email, password) VALUES
--     ('user1', 'user1@example.com', 'password1'),
--     ('user2', 'user2@example.com', 'password2'),
--     ('user3', 'user3@example.com', 'password3');

-- -- Sample data for Members table
-- INSERT INTO Members (member_id, first_name, last_name, age, phonenumber, address, gender, fitnessgoal, height, weight, email) VALUES
--     (1, 'John', 'Doe', 30, '1234567890', '123 Main St, City', 'Male', 'Weight Loss', 180.5, 80.2, 'user1@example.com'),
--     (2, 'Jane', 'Smith', 25, '9876543210', '456 Elm St, Town', 'Female', 'Muscle Gain', 165.0, 65.8, 'user2@example.com');

-- -- -- Sample data for Trainer table
-- -- INSERT INTO Trainer (trainer_id, username, password, first_name, last_name, gender, age, Avaliable_Days, Start_Time, End_Time, email) VALUES
-- --     (3, 'trainer1', 'password1', 'Alex', 'Johnson', 'Male', 35, 'Monday, Wednesday, Friday', '08:00:00', '18:00:00', 'trainer1@example.com'),
-- --     (4, 'trainer2', 'password2', 'Emily', 'Brown', 'Female', 28, 'Tuesday, Thursday, Saturday', '09:00:00', '19:00:00', 'trainer2@example.com');

-- -- -- Sample data for PT_Sessions table
-- -- INSERT INTO PT_Sessions (trainer_id, member_id, session_date, session_time) VALUES
-- --     (1, 1, '2024-04-15', '10:00:00'),
-- --     (2, 2, '2024-04-16', '11:00:00');

-- -- Sample data for Admin table
-- INSERT INTO Admin (username, email, password) VALUES
--     ('admin1', 'admin1@example.com', 'adminpassword');

-- -- Sample data for Rooms table
-- INSERT INTO Rooms (room_name, capacity, amenities, availability) VALUES
--     ('Room 1', 10, 'Projector, Whiteboard', TRUE),
--     ('Room 2', 15, 'TV, Sound System', TRUE);

-- -- -- Sample data for Bookings table
-- -- INSERT INTO Bookings (room_id, user_id, booking_date, start_time, end_time) VALUES
-- --     (1, 1, '2024-04-15', '14:00:00', '16:00:00'),
-- --     (2, 2, '2024-04-16', '15:00:00', '17:00:00');

-- -- Sample data for EquipmentMaintenance table
-- INSERT INTO EquipmentMaintenance (equipment_name, equipment_type, last_maintenance_date, next_maintenance_date, maintenance_notes, maintenance_status) VALUES
--     ('Treadmill', 'Cardio', '2024-03-01', '2024-05-01', 'Checked for lubrication', 'Completed'),
--     ('Dumbbells', 'Strength', '2024-02-15', '2024-04-15', 'Replaced missing dumbbells', 'Pending');

-- -- Sample data for ClassSchedule table
-- INSERT INTO ClassSchedule (class_name, trainer_name, class_description, class_schedule, class_location, class_capacity, registration_link) VALUES
--     ('Yoga', 'Trainer 1', 'Beginner-level yoga class', '{"Monday": "18:00 - 19:00", "Wednesday": "18:00 - 19:00"}', 'Studio 1', 20, 'https://example.com/yoga-registration'),
--     ('CrossFit', 'Trainer 2', 'High-intensity interval training', '{"Tuesday": "17:00 - 18:00", "Thursday": "17:00 - 18:00"}', 'Studio 2', 15, 'https://example.com/crossfit-registration');

-- -- -- Sample data for Billing table
-- -- INSERT INTO Billing (user_id, invoice_number, billing_date, due_date, amount_due, amount_paid, payment_date, payment_method, payment_status, notes) VALUES
-- --     (1, 'INV-001', '2024-04-01', '2024-04-15', 50.00, 0.00, NULL, NULL, 'Pending', 'Monthly membership fee'),
-- --     (2, 'INV-002', '2024-04-05', '2024-04-20', 75.00, 0.00, NULL, NULL, 'Pending', 'Personal training session fees');
