"use strict";
// localStorage.removeItem("setToDoArr");
function saveToStorage(userArr) {
  localStorage.setItem("saveUserArr", JSON.stringify(userArr));
  // localStorage.getItem("savePetArr");
  console.log(localStorage);
  // console.log(typeOf("savePetArr"));
}

function getUserFromStorage() {
  return JSON.parse(localStorage.getItem("saveUserArr"));
}

function saveUserNameToStorage(userName) {
  localStorage.setItem("saveUserNameArr", JSON.stringify(userName));
  // localStorage.getItem("savePetArr");
  console.log(localStorage);
  // console.log(typeOf("savePetArr"));
}

function getUserNameFromStorage() {
  return JSON.parse(localStorage.getItem("saveUserNameArr"));
}

function saveUserNameLoginToStorage(userLoginArr) {
  localStorage.setItem("saveUserNameLoginArr", JSON.stringify(userLoginArr));
  // localStorage.getItem("savePetArr");
  console.log(localStorage);
  // console.log(typeOf("savePetArr"));
}

function getUserNameLoginFromStorage() {
  return JSON.parse(localStorage.getItem("saveUserNameLoginArr"));
}

function saveToDoList(todoArr) {
  localStorage.setItem("setToDoArr", JSON.stringify(todoArr));
  console.log(todoArr);
}
function getToDoList() {
  return JSON.parse(localStorage.getItem("setToDoArr"));
}

function saveToDoListAfterCheckOwner(listAfterCheckOwner) {
  localStorage.setItem(
    "setToDoArrAfterCheckOwner",
    JSON.stringify(listAfterCheckOwner)
  );
  console.log(listAfterCheckOwner);
}
function getToDoListAfterCheckOwner() {
  return JSON.parse(localStorage.getItem("setToDoArrAfterCheckOwner"));
}

function saveSettingOfPage(settingOfPageArr) {
  localStorage.setItem("setSettingOfPage", JSON.stringify(settingOfPageArr));
  console.log(settingOfPageArr);
}
function getSettingOfPage() {
  return JSON.parse(localStorage.getItem("setSettingOfPage"));
}
