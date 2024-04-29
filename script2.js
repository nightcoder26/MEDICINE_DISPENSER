const params = new URLSearchParams(window.location.search);
const username = params.get("username");

document.getElementById("usernameGlobal").textContent = username;

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
// const usersDB = firebase.database().ref("users");
const db = firebase.database();

// function getMedicineDetails(username) {
//   const usersRef = db.ref("MEDICINE_DISPENSER_ECS");
//   const users = snapshot.val();

//   const userKeys = Object.keys(users);

//   usersRef.once("value", (snapshot) => {
//     const users = snapshot.val();
//     for (let i = 1; i < userKeys.length; i++) {
//       const userKey = userKeys[i];
//       const user = users[userKey];
//       // const user = users[userId];
//       console.log(user);
//       console.log(user.username);
//       console.log(user.medicineName);
//       const dbUsername = user.username
//         .trim()
//         .toLowerCase()
//         .replace(/^"(.*)"$/, "$1");
//       const dbPassword = user.password
//         .trim()
//         .toLowerCase()
//         .replace(/^"(.*)"$/, "$1");

//       console.log(user.dbUsername);
//       //   if (user.username === username) {
//       //     const dbMedicineName = user.medicineName
//       //       ? user.medicineName.replace(/^"(.*)"$/, "$1").trim()
//       //       : ""; // Handle undefined or null values
//       //     const dbAmount = user.amount
//       //       ? user.amount.replace(/^"(.*)"$/, "$1").trim()
//       //       : ""; // Handle undefined or null values
//       //     updateTable(dbMedicineName, dbAmount);
//       //     break;
//       //   }
//     }
//   });
// }

function getMedicineDetails(username) {
  const usersRef = firebase.database().ref("MEDICINE_DISPENSER_ECS");
  usersRef.once("value", (snapshot) => {
    const users = snapshot.val();
    const userKeys = Object.keys(users);

    for (let i = 1; i < userKeys.length; i++) {
      const userKey = userKeys[i];
      const user = users[userKey];
      console.log(user);
      const dbUsername = user.username
        .trim()
        .toLowerCase()
        .replace(/^"(.*)"$/, "$1");

      if (dbUsername === username) {
        const medicineName = user.medicineName;
        const amount = user.amount;
        updateTable(
          medicineName
            .trim()
            .toLowerCase()
            .replace(/^"(.*)"$/, "$1"),
          1,
          amount
            .trim()
            .toLowerCase()
            .replace(/^"(.*)"$/, "$1")
        );
        break;
      }
    }
  });
}

function updateTable(medicineName, quantity, amount) {
  const tableRow = document.createElement("tr");
  const medicineNameCell = document.createElement("td");
  medicineNameCell.textContent = medicineName;
  const quantityCell = document.createElement("td");
  quantityCell.textContent = quantity;
  const amountCell = document.createElement("td");
  amountCell.textContent = amount;
  tableRow.appendChild(medicineNameCell);
  tableRow.appendChild(quantityCell);
  tableRow.appendChild(amountCell);

  document.getElementById("medicine-table").appendChild(tableRow);
}

getMedicineDetails(username);

function handleLogout() {
  console.log("Logging out");
  window.location.href = "index.html";
}
