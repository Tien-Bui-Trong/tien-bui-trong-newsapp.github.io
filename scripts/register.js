"use strict";

const registerBtn = document.getElementById("btn-submit");
const inPutFirstName = document.getElementById("input-firstname");
const inPutLastName = document.getElementById("input-lastname");
const inPutUserName = document.getElementById("input-username");
const inPutPass = document.getElementById("input-password");
const inPutConfirmPass = document.getElementById("input-password-confirm");

let userArr = getUserFromStorage() || [];
console.log(userArr);
// let userArr = [];
let data = {};
let userName = getUserNameFromStorage() || [];

// get data from Input

registerBtn.addEventListener("click", function () {
  data = {
    firstName: inPutFirstName.value,
    lastName: inPutLastName.value,
    userName: inPutUserName.value,
    pass: inPutPass.value,
    confirmPass: inPutConfirmPass.value,
  };
  validate();
});

// Validate data

const validate = function () {
  if (inPutFirstName.value == "") {
    window.alert("Please input First Name");
    return;
  } else if (inPutLastName.value == "") {
    window.alert("Please input Last Name");
    return;
  }
  // else if (inPutUserName.value !== "" && !userName.includes(data.userName)){

  // }
  else if (inPutUserName.value == "") {
    window.alert("Please input User Name");
    return;
  } else if (userName.includes(data.userName)) {
    window.alert("This username is existed");
    return;
  } else if (inPutPass.value == "") {
    window.alert("Please input Password");
    return;
  } else if (inPutPass.value.length < 8) {
    window.alert("Length of password must be longer than 8 characters");
    return;
  } else if (inPutConfirmPass.value == "") {
    window.alert("Please confrim your password");
    return;
  } else if (data.pass !== data.confirmPass) {
    window.alert("2 passwords must be same");
    return;
  } else {
    userArr.push(data);
    userName.push(data.userName);
  }
  saveToStorage(userArr);
  saveUserNameToStorage(userName);
  console.log(userArr);
  window.location.href = "../pages/login.html";
};

// create class user
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}
// const userN = new User("bui", "trong", "bui tien", "12345678");
// console.log(userN);
function parseUser(userData) {
  for (let i = 0; i < userData.length; i++) {
    const userX = new User(
      userData[i].firstName,
      userData[i].lastName,
      userData[i].userName,
      userData[i].pass
    );
    console.log(userX);
  }
}
parseUser(userArr);
