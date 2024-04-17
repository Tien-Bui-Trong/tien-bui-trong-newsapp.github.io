"use strict";

const chooseListToDo = document.getElementById("todo-list");

const toDoTask = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
let todoAction = "";
let html = "";
let listAfterCheckOwner = [];
// let listAfterCheckOwner = getToDoListAfterCheckOwner() || [];
console.log(listAfterCheckOwner);
let toDoTaskData = {};
let todoArr = getToDoList() || [];
console.log(todoArr);
let userLoginArr = getUserNameLoginFromStorage() || [];
console.log(userLoginArr[0].username);
let userArr = getUserFromStorage() || [];

// ------------- changing colour and add crossline into work that is done-------------

const detectDoneTask = function (todoAction) {
  console.log(todoAction);

  let actionChosen = document.getElementById(`action-${todoAction}`);
  if (actionChosen.classList.contains("checked")) {
    actionChosen.classList.remove("checked");
  } else {
    actionChosen.classList.add("checked");
  }
};

// ------------- process of delete task -------------

const deleteTask = function (todoArrowTask) {
  console.log(todoArrowTask);
  let actionDelete = document.getElementById(`action-${todoArrowTask}`);
  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].task == todoArrowTask) {
      todoArr.splice(i, 1);
      saveToDoList(todoArr);
      console.log(todoArr);
      actionDelete.classList.add("hidden");
    }
  }
};

// ------------- Render task -------------

const renderToDoList = function (todoArrow) {
  // chooseListToDo.innerHTML = "";
  // for (let i = 0; i < todoArrow.length; i++) {
  html = `
  <li id= "action-${todoArrow}" onclick="detectDoneTask('${todoArrow}')">${todoArrow}<span  class="close" id= "delelte-${todoArrow}" onclick="deleteTask('${todoArrow}')">×</span></li>
 `;
  chooseListToDo.insertAdjacentHTML("beforeend", html);
  chooseListToDo.style.opacity = 1;

  // const taskDelete = document.getElementById(`delete-${todoArrow}`);
  // taskDelete.addEventListener("click", function () {
  //   console.log("todoArr");
  // });
  // }
};

// ------------- process of visualizing task when opening the tab -------------

for (let i = 0; i < todoArr.length; i++) {
  if (todoArr[i].owner == userLoginArr[0].username) {
    console.log(todoArr[i].task);
    renderToDoList(todoArr[i].task);
    // listAfterCheckOwner.push(todoArr[i].task);
  }
  // console.log(listAfterCheckOwner[i]);
}
// console.log(listAfterCheckOwner);
// renderToDoList(listAfterCheckOwner);

// ------------- add task into class -------------

class toDoList {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

const parsetoDoList = function (userData) {
  for (let i = 0; i < userData.length; i++) {
    const tasknumber = new toDoList(
      userData[i].task,
      userData[i].owner,
      userData[i].isDone
    );
    console.log(tasknumber);
  }
};

// ------------- process of adding task when clicking add button -------------

addBtn.addEventListener("click", function () {
  toDoTaskData = {
    task: toDoTask.value,
    owner: userLoginArr[0].username,
    isDone: false,
  };
  if (toDoTask.value == "") {
    window.alert("please type your task");
    return;
  } else {
    if (toDoTaskData.owner == userLoginArr[0].username) {
      todoArr.push(toDoTaskData);
      parsetoDoList(todoArr);
      console.log(todoArr);
      // console.log(todoArr);
      saveToDoList(todoArr);
      renderToDoList(toDoTaskData.task);
    }
    // for (let i = 0; i < todoArr.length; i++) {
    // if (todoArr[i].owner == userLoginArr[0].username) {
    //   listAfterCheckOwner.push(todoArr[i].task);
    //   // saveToDoListAfterCheckOwner(listAfterCheckOwner);
    //   console.log(listAfterCheckOwner);
    //   console.log(toDoTaskData.task);
    //   renderToDoList(listAfterCheckOwner);
    // }
    // }
  }
});
