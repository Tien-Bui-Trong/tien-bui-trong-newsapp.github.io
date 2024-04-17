"use strict";

// Login function
let userArr = getUserFromStorage() || [];
let userName = getUserNameFromStorage() || [];
let userLoginArr = getUserNameLoginFromStorage() || [];
let checkUserNameExist = [];
let checkUserPassExist = [];
console.log(userLoginArr);
let dataLogin = {};
console.log(userArr);

const usernameInput = document.getElementById("input-username");
const passInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit-login");

// ------------- Processing when clicking login button-------------

loginBtn.addEventListener("click", function () {
  dataLogin = {
    username: usernameInput.value,
    password: passInput.value,
  };
  console.log(userLoginArr);
  validateDataLogin();
});

// ------------- Validate data login that is blank or not -------------

const validateDataLogin = function () {
  if (dataLogin.username == "" || dataLogin.password == "") {
    window.alert("Please fill the username and password");
    return;
  } else {
    contrastExistData();
  }
};

// ------------- Login Process ----------------

console.log(checkUserNameExist, checkUserPassExist);
const contrastExistData = function () {
  for (let i = 0; i < userArr.length; i++) {
    checkUserNameExist.push(userArr[i].userName);
    checkUserPassExist.push(userArr[i].pass);
  }
  if (
    checkUserNameExist.includes(dataLogin.username) &&
    checkUserPassExist.includes(dataLogin.password)
    // dataLogin.username == userArr[i].userName &&
    // dataLogin.password == userArr[i].pass
  ) {
    console.log("success");
    userLoginArr.push(dataLogin);
    saveUserNameLoginToStorage(userLoginArr);
    window.location.href = "../index.html";
    return dataLogin.username, dataLogin.password;
  } else {
    console.log("fail");
    window.alert("UserName or Password is wrong");
    return;
  }
};
