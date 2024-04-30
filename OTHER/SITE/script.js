const firebaseConfig = {
  apiKey: "AIzaSyCNtVJg0HvCrL3C2P9xawiHb4cc55tp94c",
  authDomain: "medicine-dispenser-83e85.firebaseapp.com",
  databaseURL: "https://medicine-dispenser-83e85-default-rtdb.firebaseio.com",
  projectId: "medicine-dispenser-83e85",
  storageBucket: "medicine-dispenser-83e85.appspot.com",
  messagingSenderId: "61220334336",
  appId: "1:61220334336:web:518f1fc348e177f820e1e5",
};
// var usernameGlobal = "";
firebase.initializeApp(firebaseConfig);
const usersDB = firebase.database().ref("users");
document
  .getElementById("login-form-main")
  .addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  // usernameGlobal = username;
  const usersRef = firebase.database().ref("MEDICINE_DISPENSER_ECS");
  usersRef.once("value", (snapshot) => {
    const users = snapshot.val();
    const userKeys = Object.keys(users);
    let isValidUser = false;

    for (let i = 1; i < userKeys.length; i++) {
      // const userKey = userKeys[i];
      // const user = users[userKey];
      // const inputUsername = username.trim().toLowerCase();
      // const dbUsername = user.username.trim().toLowerCase();
      // console.log(user);
      // console.log(user.username);
      // console.log(user.password);
      // console.log(inputUsername == user.username);
      // if (user.username === username && user.password === password) {
      //   isValidUser = true;
      //   break;
      // }

      const userKey = userKeys[i];
      const user = users[userKey];
      console.log(user);
      console.log(user.username);
      console.log(user.password);

      const dbUsername = user.username
        .trim()
        .toLowerCase()
        .replace(/^"(.*)"$/, "$1");
      const dbPassword = user.password
        .trim()
        .toLowerCase()
        .replace(/^"(.*)"$/, "$1");

      if (dbUsername === username && dbPassword === password) {
        isValidUser = true;
        break;
      }

      // console.log("Input username:", username);
      // console.log("DB username:", dbUsername);

      // console.log(username == dbUsername);
    }

    if (isValidUser) {
      // console.log("Valid user");
      window.location.href =
        "index2.html?username=" + encodeURIComponent(username);
      // localStorage.setItem("username", username);
    } else {
      console.log("Invalid user");
      document.getElementById("error-message").innerHTML = "Invalid user";
    }
  });
  /*     MEDICINE_DISPENSER_ECS: {
      counter:1005,
      user1001:{
        username:"joker",
        password: "sad",
        medicineName: "paracetamol",
        amount: "20",
      }
     }
  */
}

// function getUsername() {
//   document.getElementById("usernameGlobal").innerHTML = usernameGlobal;
// }
