const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const client = new Client({
  //URL: "jdbc:postgresql://localhost:5432/3005_Final_Project",
  host: "localhost",
  user: "postgres",
  password: "Simar@2002",
  port: 5432,
  database: "ProjectDemonstration",
});

client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.static(path.join(__dirname, "Components")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "Components", "index.html"));
});

app.post("/signup", async (req, res) => {
  const userData = req.body;

  try {
    await client.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [userData.username, userData.email, userData.password]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error inserting user data:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while signing up. Please try again later.",
    });
  }
});

app.post("/adminSignUp", async (req, res) => {
    const userData = req.body
    try {
      await client.query(
        "INSERT INTO Admin (username, email, password) VALUES ($1, $2, $3)",
        [userData.username, userData.email, userData.password]
      );
  
      res.json({ success: true });
    } catch (error) {
      console.error("Error inserting admin data:", error);
      res.status(500).json({
        success: false,
        error: "An error occurred while signing up. Please try again later.",
      });
    }
  });

app.post("/addmember", async (req, res) => {
  const memberData = req.body;

  try {
    await client.query(
      "INSERT INTO Members (first_name, last_name, age, phonenumber, address, gender, fitnessgoal, height, weight, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        memberData.first_name,
        memberData.last_name,
        memberData.age,
        memberData.phonenumber,
        memberData.address,
        memberData.gender,
        memberData.fitnessgoal,
        memberData.height,
        memberData.weight,
        memberData.email,
      ]
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Error inserting member data:", error);
    res
      .status(500)
      .json({
        success: false,
        error:
          "An error occurred while adding member information. Please try again later.",
      });
  }
});

app.post("/addtrainer", async (req, res) => {
  const trainerData = req.body;

  const Start_Time = trainerData.Start_Time
    ? trainerData.Start_Time.toISOString().split("T")[1]
    : null;
  const End_Time = trainerData.End_Time
    ? trainerData.End_Time.toISOString().split("T")[1]
    : null;

  try {
    await client.query(
      "INSERT INTO Trainer (username, password, first_name, last_name, gender, age, Avaliable_Days, Start_Time, End_Time, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        trainerData.username,
        trainerData.password,
        trainerData.first_name,
        trainerData.last_name,
        trainerData.gender,
        trainerData.age,
        trainerData.Avaliable_Days,
        trainerData.Start_Time,
        trainerData.End_Time,
        trainerData.email,
      ]
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Error inserting trainer data:", error);
    res
      .status(500)
      .json({
        success: false,
        error:
          "An error occurred while adding trainer information. Please try again later.",
      });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const memberResult = await client.query(
      "SELECT * FROM Members WHERE email = $1",
      [email]
    );

    if (memberResult.rows.length > 0) {
      const userResult = await client.query(
        "SELECT password FROM Users WHERE email = $1",
        [email]
      );
      if (userResult.rows.length > 0) {
        const userPassword = userResult.rows[0].password;
        if (password === userPassword) {
          const memberInfo = memberResult.rows[0];
          res.json({ success: true, memberInfo });
          return;
        } else {
          res.json({ success: false, message: "Invalid password." });
          return; 
        }
      } else {
        res.json({ success: false, message: "User not found." });
        return; 
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "An error occurred during login. Please try again later.",
      });
  }
});

app.post("/trainerlogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const trainerResult = await client.query(
      "SELECT * FROM Trainer WHERE email = $1",
      [email]
    );

    if (trainerResult.rows.length > 0) {
      const passResult = await client.query(
        "SELECT password from Trainer WHERE email = $1",
        [email]
      );
      if (passResult.rows.length > 0) {
        const trainerPassword = passResult.rows[0].password;
        if (password === trainerPassword) {
          const trainerInfo = trainerResult.rows[0];
          res.json({ success: true, trainerInfo });
          return;
        } else {
          res.json({ success: false, message: "INVALID PASSWORD. " });
        }
      }
    } else {
      return { success: false, message: "Trainer not found." };
    }
  } catch (error) {
    console.error("Error during trainer login:", error);
    return {
      success: false,
      error: "An error occurred during login. Please try again later.",
    };
  }
});

app.post("/searchmembers", async (req, res) => {
  try {
    const { searchQuery } = req.body;
    const result = await client.query(
      "SELECT * FROM members WHERE first_name ILIKE $1 OR last_name ILIKE $1",
      [`%${searchQuery}%`]
    );
    const members = result.rows;
    res.json({ success: true, results: members });
  } catch (error) {
    console.error("Error searching members:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while searching members.",
      });
  }
});
app.get("/gettrainers", async (req, res) => {
  try {
    const trainers = await client.query("SELECT * FROM Trainer");
    res.json({ trainers: trainers.rows });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching trainers." });
  }
});
app.post("/scheduleptsession", async (req, res) => {
  const sessionData = req.body;

  try {
    await client.query(
      "INSERT INTO PT_Sessions (trainer_id, session_date, session_time) VALUES ($1, $2, $3)",
      [sessionData.trainer_id, sessionData.date, sessionData.time]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error scheduling PT session:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "An error occurred while scheduling PT session.",
      });
  }
});

app.post("/bookroom", async (req, res) => {
    const bookingData = req.body;
  
    try {
      const roomAvailability = await client.query(
        "SELECT availability FROM Rooms WHERE room_id = $1",
        [bookingData.room_id]
      );
  
      if (!roomAvailability.rows[0].availability) {
        res.json({ success: false, message: "Selected room is not available." });
        return;
      }
      await client.query(
        "INSERT INTO Bookings (room_id, user_id, booking_date, start_time, end_time) VALUES ($1, $2, $3, $4, $5)",
        [
          bookingData.room_id,
          bookingData.user_id, 
          bookingData.booking_date,
          bookingData.start_time,
          bookingData.end_time,
        ]
      );
  
      await client.query(
        "UPDATE Rooms SET availability = FALSE WHERE room_id = $1",
        [bookingData.room_id]
      );

      res.json({ success: true, message: "Room booked successfully." });
    } catch (error) {
      console.error("Error booking room:", error);
      res.status(500).json({
        success: false,
        error: "An error occurred while booking the room. Please try again later.",
      });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("http://localhost:3000/");
});
