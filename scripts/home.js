"use strict";
let welcomeUser = document.getElementById("welcome-message");
let userArr = getUserFromStorage() || [];
let userLoginArr = getUserNameLoginFromStorage() || [];
console.log(userLoginArr);

const logined = document.getElementById("login-modal");
const nonLogined = document.getElementById("main-content");
const logoutBtn = document.getElementById("btn-logout");


// ------------- Login Process-------------


if (userLoginArr.length > 0) {
  console.log("1");
  welcomeUser.innerHTML = `Welcome ${userLoginArr[0].username}`;
  logined.classList.add("hidden");
} else nonLogined.classList.add("hidden");


// ------------- Save user logined before into storage-------------

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("saveUserNameLoginArr");
  window.location.href = "../pages/login.html";
});
