"use strict";

let data = {
  newsOfPage: 5,
  category: "General",
};
let settingOfPage = getSettingOfPage() || [];

if (settingOfPage.length > 0) settingOfPage = getSettingOfPage() || [];
else {
  settingOfPage.push(data);
}

console.log(settingOfPage);

let pageSizeInput = document.getElementById("input-page-size");
let categoryInput = document.getElementById("input-category");
let submitBtn = document.getElementById("btn-submit");

pageSizeInput.value = settingOfPage[0].newsOfPage;
categoryInput.value = settingOfPage[0].category;

let convertDataNewstoJS = {};

// ---------------------- get data through api-----------------------------

const getData = async function (numOfPage) {
  const dataNews = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=5&page=${numOfPage}&apiKey=082888c3ac4b44df8d416c80108553a8`
  );

  convertDataNewstoJS = await dataNews.json();

  console.log(convertDataNewstoJS);

  // console.log("1");
};
getData(1);

// ------------- Processing when clicking submit button-------------

submitBtn.addEventListener("click", function () {
  data = {
    newsOfPage: Number(pageSizeInput.value),
    category: categoryInput.value,
  };
  console.log(typeof data.newsOfPage);
  if (data.newsOfPage > 5) {
    window.alert("The number of news must be under 5 news");
    return;
  }
  if (settingOfPage.length <= 1) {
    settingOfPage.splice(0, 1, data);
    // settingOfPage.push(data);
    saveSettingOfPage(settingOfPage);
    console.log(settingOfPage);
  } else {
    settingOfPage.splice(0);
    settingOfPage.push(data);
    saveSettingOfPage(settingOfPage);
    console.log(settingOfPage);
  }
});
