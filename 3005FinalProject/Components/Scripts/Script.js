document.addEventListener("DOMContentLoaded", function () {
  const signupButton = document.getElementById("signup-button");
  const signupContainer = document.getElementById("signup-container");
  const signupForm = document.getElementById("signup-form");
  const signupMessage = document.getElementById("signup-message");
  const trainerSignupButton = document.getElementById("signUpTrainer-button");
  const trainerContainer = document.getElementById("trainer-container");
  const trainerForm = document.getElementById("trainer-form");
  const trainersMessage = document.getElementById("trainers-message");
  const membersContainer = document.getElementById("members-container");
  const membersForm = document.getElementById("members-form");
  const membersMessage = document.getElementById("members-message");
  const adminSignButton = document.getElementById("signUpAdmin-button");
  const adminContainer = document.getElementById("signUpAdmin-container");
  const adminSignUpForm = document.getElementById("signupAdmin-form");
  const signUpAdminMessage = document.getElementById("adminSignUp-message");

  signupButton.addEventListener("click", function () {
    signupContainer.style.display = "block";
    membersContainer.style.display = "none";
  });

  trainerSignupButton.addEventListener("click", function () {
    trainerContainer.style.display = "block";
    signupContainer.style.display = "none";
    membersContainer.style.display = "none";
  });

  adminSignButton.addEventListener("click", function () {
    adminContainer.style.display = "block";
    trainerContainer.style.display = "none";
    membersContainer.style.display = "none";
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    // Get form data
    const formData = new FormData(signupForm);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Send data to the server
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          signupMessage.textContent = "Signup successful!";
          membersContainer.style.display = "block";
          signupContainer.style.display = "none";
        } else {
          signupMessage.textContent = "Signup failed. Please try again.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        signupMessage.textContent =
          "An error occurred. Please try again later.";
      });
  });

  trainerForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const formData = new FormData(trainerForm);
    const trainerData = {
      username: formData.get("username"),
      password: formData.get("password"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      gender: formData.get("gender"),
      age: formData.get("age"),
      Avaliable_Days: formData.get("Avaliable_Days"),
      Start_Time: formData.get("Start_Time"),
      End_Time: formData.get("End_Time"),
      email: formData.get("email"),
    };

    fetch("/addtrainer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          trainersMessage.textContent =
            "Trainer information added successfully!";
          trainersMessage.textContent =
            "Please LOG IN with the email and password you provided.";
          trainerForm.style.display = "none";
        } else {
          trainersMessage.textContent =
            "Failed to add Trainer information. Please try again.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        membersMessage.textContent =
          "An error occurred. Please try again later.";
      });
  });

  adminSignUpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(adminSignUpForm);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch("/adminSignUp",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success){
            signUpAdminMessage.textContent = "Admin SignUp Successful";
        }
        else{
            signUpAdminMessage.textContent = "Admin SignUp failed. Please try again";
        }
        })
        .catch((error) => {
            console.error("Error:", error);
            signUpAdminMessage.textContent = "An error occurred. Please try again later.";
        });
    });

  membersForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    // Get form data
    const formData = new FormData(membersForm);
    const memberData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      age: formData.get("age"),
      phonenumber: formData.get("phonenumber"),
      address: formData.get("address"),
      gender: formData.get("gender"),
      fitnessgoal: formData.get("fitnessgoal"),
      height: formData.get("height"),
      weight: formData.get("weight"),
      email: formData.get("email"),
    };

    fetch("/addmember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          membersMessage.textContent = "Member information added successfully!";
          membersMessage.textContent =
            "Please LOG IN with the email and password you provided.";
          membersForm.style.display = "none";
        } else {
          membersMessage.textContent =
            "Failed to add member information. Please try again.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        membersMessage.textContent =
          "An error occurred. Please try again later.";
      });
  });

  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");
  const welcomeMessage = document.getElementById("welcome-message");
  const memberInfoTable = document.getElementById("member-info-table");
  const logoutButton = document.getElementById("logout-button");

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("userInfo");

    welcomeMessage.style.display = "none";
    memberInfoTable.innerHTML = "";

    loginForm.style.display = "block";
    signupContainer.style.display = "block";

    logoutButton.style.display = "none";
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          welcomeMessage.style.display = "block";
          loginForm.style.display = "none";
          loginForm.reset();
          const memberInfo = data.memberInfo;
          memberInfoTable.innerHTML = `
                    <table>
                        <tr>
                            <th>First Name</th>
                            <td>${memberInfo.first_name}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>${memberInfo.last_name}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>${memberInfo.age}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>${memberInfo.phonenumber}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>${memberInfo.address}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>${memberInfo.gender}</td>
                        </tr>
                        <tr>
                            <th>Fitness Goal</th>
                            <td>${memberInfo.fitnessgoal}</td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>${memberInfo.height}</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>${memberInfo.weight}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${memberInfo.email}</td>
                        </tr>
                    </table>
                    
                `;
          memberInfoTable.innerHTML += `
                    <button id="schedule-pt-button">Schedule PT Session</button>
                    <form id="pt-schedule-form" style="display: none;">
                        <!-- PT session scheduling form -->
                    </form>
                `;
          const schedulePTButton =
            document.getElementById("schedule-pt-button");
          const ptScheduleForm = document.getElementById("pt-schedule-form");

          schedulePTButton.addEventListener("click", function () {
            fetchAvailableTrainers();
            ptScheduleForm.style.display = "block";
          });

          ptScheduleForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const selectedTrainerId = document.getElementById(
              "selected-trainer-id"
            ).value;
            const sessionDate = document.getElementById("session-date").value;
            const sessionTime = document.getElementById("session-time").value;

            const sessionData = {
              trainer_id: selectedTrainerId,
              date: sessionDate,
              time: sessionTime,
            };

            fetch("/scheduleptsession", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sessionData),
            })
              .then((response) => response.json())
              .then((data) => {
              })
              .catch((error) => {
                console.error("Error:", error);
                // Handle error
              });
          });
        } else {
          loginMessage.textContent =
            data.message || "An error occurred. Please try again later.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        loginMessage.textContent = "An error occurred. Please try again later.";
      });
  });

  const loginTrainerForm = document.getElementById("loginTrainer-form");
  const loginTrainerMessage = document.getElementById("loginTrainer-message");
  const welcomeTrainerMessage = document.getElementById(
    "welcomeTrainer-message"
  );
  const trainerInfoTable = document.getElementById("trainer-info-table");

  loginTrainerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(loginTrainerForm);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch("/trainerlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          welcomeTrainerMessage.style.display = "block";
          loginTrainerForm.style.display = "none";
          loginTrainerForm.reset();
          const trainerInfo = data.trainerInfo;
          trainerInfoTable.innerHTML = `
                    <table>
                        <tr>
                            <th>First Name</th>
                            <td>${trainerInfo.first_name}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>${trainerInfo.last_name}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>${trainerInfo.age}</td>
                        </tr>
                        <tr>
                            <th>Avaliable Days</th>
                            <td>${trainerInfo.Avaliable_Days}</td>
                        </tr>
                        <tr>
                            <th>Start Time</th>
                            <td>${trainerInfo.Start_Time}</td>
                        </tr>
                        <tr>
                            <th>End Time</th>
                            <td>${trainerInfo.End_Time}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${trainerInfo.email}</td>
                        </tr>
                    </table>
                `;
        } else {
          loginTrainerMessage.textContent =
            data.message || "An error occurred. Please try again later.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        loginTrainerMessage.textContent =
          "An error occurred. Please try again later.";
      });
  });

  document
    .getElementById("member-search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const searchQuery = document.getElementById("search-query").value;

      fetch("/searchmembers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery }),
      })
        .then((response) => response.json())
        .then((data) => {
          displaySearchResults(data.results); 
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

  function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById(
      "member-search-results"
    );
    searchResultsContainer.innerHTML = ""; 
    if (results.length === 0) {
      searchResultsContainer.textContent = "No members found.";
    } else {
      const resultList = document.createElement("ul");
      results.forEach((member) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${member.first_name} ${member.last_name} - ${member.email}`;
        resultList.appendChild(listItem);
      });
      searchResultsContainer.appendChild(resultList);
    }
  }

  function isMemberLoggedIn() {
    return localStorage.getItem("userInfo") !== null;
  }
  const schedulePTButton = document.getElementById("schedule-pt-button");
  const ptScheduleForm = document.getElementById("pt-schedule-form");

  function fetchAvailableTrainers() {
    fetch("/gettrainers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        displayAvailableTrainers(data.trainers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function displayAvailableTrainers(trainers) {
    const trainerList = document.getElementById("trainer-list");
    trainerList.innerHTML = "";

    trainers.forEach((trainer) => {
      const trainerItem = document.createElement("li");
      trainerItem.textContent = `${trainer.first_name} ${trainer.last_name}`;
      trainerItem.addEventListener("click", function () {
        document.getElementById("selected-trainer-id").value = trainer_id;
      });
      trainerList.appendChild(trainerItem);
    });
  }

  schedulePTButton.addEventListener("click", function () {
    if (isMemberLoggedIn()) {
      fetchAvailableTrainers();
      ptScheduleForm.style.display = "block";
    } else {
      console.log("Please log in as a member to schedule a PT session.");
    }
  });

  ptScheduleForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!isMemberLoggedIn()) {
      console.log("Please log in as a member to schedule a PT session.");
      return;
    }
    const selectedTrainerId = document.getElementById(
      "selected-trainer-id"
    ).value;
    const sessionDate = document.getElementById("session-date").value;
    const sessionTime = document.getElementById("session-time").value;

    const sessionData = {
      trainer_id: selectedTrainerId,
      date: sessionDate,
      time: sessionTime,
    };

    fetch("/scheduleptsession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionData),
    })
      .then((response) => response.json())
      .then((data) => {
        
      })
      .catch((error) => {
        console.error("Error:", error);
        
      });
  });

  document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const bookingData = {
      room_id: formData.get("room_id"),
      booking_date: formData.get("booking_date"),
      start_time: formData.get("start_time"),
      end_time: formData.get("end_time"),
      user_id: formData.get("user_id"),
    };
  
    fetch("/bookroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Room booked successfully!");
      } else {
        alert("Failed to book the room. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while booking the room. Please try again later.");
    });
  });
  
});
