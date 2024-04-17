"use strict";

let serchBtn = document.getElementById("btn-submit");
let searchContent = document.getElementById("input-query");
let pageContent = document.getElementById("news-container");

let pageNumContainer = document.getElementById("page-number-container");

let searchingKey = "business";
const pageSizeNumber = 5;
let convertDataNewstoJS = {};
let numMaxOfPage = 0;
let allowChangePageNum = true;
let i = 0;
let numOfPage = 1;
// let dataNews = "";

// ---------------------- get data through api-----------------------------

let getData = async function (key) {
  let dataNews = await fetch(
    `https://newsapi.org/v2/everything?q=${searchingKey}&page=${numOfPage}&apiKey=082888c3ac4b44df8d416c80108553a8`
  );

  // if (!dataNews.ok) throw new Error("problem getting new data");
  console.log(dataNews);
  convertDataNewstoJS = await dataNews.json();

  // console.log(convertDataNewstoJS.articles[0]);
  console.log(convertDataNewstoJS);
  renderNews();
  pageNumCalc();
  serchBtn.addEventListener("click", function () {
    searchingKey = searchContent.value;
    if (searchingKey !== "") {
      console.log(searchingKey);
      getData();
      console.log(convertDataNewstoJS.articles[0]);
      renderNews();
      pageNumCalc();
    } else {
      console.log(1);
      return window.alert("please input key to search");
    }
  });
};

// ---------------------- Render news into mornitor -----------------------------

const renderNews = function () {
  pageContent.innerHTML = "";

  if (convertDataNewstoJS.articles.length !== 0) {
    let html = "";
    for (let i = 0; i < pageSizeNumber; i++) {
      // console.log(convertDataNewstoJS.articles[i]);
      html = `<div class="card flex-row flex-wrap">
<div class="card mb-3" style="">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${convertDataNewstoJS.articles[i].urlToImage}"
        class="card-img">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${convertDataNewstoJS.articles[i].title}</h5>
        <p class="card-text">${convertDataNewstoJS.articles[i].description}</p>
        <a href="${convertDataNewstoJS.articles[i].url}"
          class="btn btn-primary">View</a>
      </div>
    </div>
  </div>
</div>
</div>`;

      pageContent.insertAdjacentHTML("beforeend", html);
      pageContent.style.opacity = 1;
    }
  } else pageContent.innerHTML = "There is nothing searched with this keyword!";
};

// ---------------------- calculate and process page number, next and pre button -----------------------------

const pageNumCalc = function () {
  console.log("1");
  console.log(convertDataNewstoJS.totalResults);
  numMaxOfPage = Math.round(convertDataNewstoJS.totalResults / pageSizeNumber);
  // if (numMaxOfPage % 2 !== 0)
  console.log(numMaxOfPage);
  renderNumberOfPage();
  let preBtn = document.getElementById("btn-prev");
  let nextBtn = document.getElementById("btn-next");
  let pageNum = document.getElementById("page-num");

  if (numOfPage == 1) preBtn.classList.add("hidden");
  if (numOfPage == numMaxOfPage) nextBtn.classList.add("hidden");
  preBtn.addEventListener("click", function () {
    allowChangePageNum = true;
    if (allowChangePageNum == true && numOfPage > 1) {
      numOfPage--;
      getData(numOfPage);

      pageNum.textContent = `${numOfPage}`;
      console.log(`numOfPage: ${numOfPage}`);
      if (numOfPage == 1) allowChangePageNum = false;
    } else allowChangePageNum = false;
    //  renderNumberOfPage();
    if (numOfPage == 1) preBtn.classList.add("hidden");
    else if (numOfPage !== numMaxOfPage) nextBtn.classList.remove("hidden");
  });

  nextBtn.addEventListener("click", function () {
    console.log(numMaxOfPage);
    allowChangePageNum = true;
    if (allowChangePageNum == true && numOfPage < numMaxOfPage) {
      numOfPage++;
      getData(numOfPage);
      pageNum.textContent = `${numOfPage}`;
      console.log(`numOfPage: ${numOfPage}`);
      if (numOfPage == numMaxOfPage) allowChangePageNum = false;
    } else allowChangePageNum = false;
    //  renderNumberOfPage();
    if (numOfPage == numMaxOfPage) nextBtn.classList.add("hidden");
    else if (numOfPage !== 1) preBtn.classList.remove("hidden");
  });
};

// ---------------------- render next, pre, and number page button -----------------------------

const renderNumberOfPage = function () {
  console.log(numOfPage);
  pageNumContainer.innerHTML = "";
  let pageNumHtml = "";
  pageNumHtml = `<li class="page-item">
  <button class="page-link" href="#" id="btn-prev">Previous</button>
</li>
<li class="page-item disabled">
  <a class="page-link" id="page-num">${numOfPage}</a>
</li>
<li class="page-item">
  <button class="page-link" id="btn-next">Next</button>
</li>`;

  pageNumContainer.insertAdjacentHTML("beforeend", pageNumHtml);
  pageNumContainer.style.opacity = 1;
};

getData();
