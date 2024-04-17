"use strict";
// API key: 082888c3ac4b44df8d416c80108553a8

// ---------------------- assign default parameter, default information visulazied by the web -----------------------------

let data = {
  newsOfPage: 5,
  category: "General",
};
console.log(data);
let settingOfPage = getSettingOfPage() || [];
console.log(settingOfPage);

if (settingOfPage.length === 0) {
  // if (settingOfPage.length === 0) {
  settingOfPage.push(data);
}
console.log(settingOfPage);
let numMaxOfPage = 0;
const pageSizeNumber = settingOfPage[0].newsOfPage || 5;
const pageCategory = settingOfPage[0].category || General;
console.log(pageCategory);
let allowChangePageNum = true;
let i = 0;
let numOfPage = 1;
let convertDataNewstoJS = {};

let newsContainer = document.getElementById("news-container");

let pageNumContainer = document.getElementById("page-number-container");

// ---------------------- Render news into mornitor -----------------------------

const renderNews = function () {
  newsContainer.innerHTML = "";
  console.log("1");
  let html = "";
  for (let i = 0; i < pageSizeNumber; i++) {
    // console.log(convertDataNewstoJS.articles[0]);
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

    newsContainer.insertAdjacentHTML("beforeend", html);
    newsContainer.style.opacity = 1;
  }
};

// ---------------------- get data through api-----------------------------

const getData = async function (numOfPage) {
  const dataNews = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${pageCategory}&pageSize=5&page=${numOfPage}&apiKey=082888c3ac4b44df8d416c80108553a8`
  );

  convertDataNewstoJS = await dataNews.json();

  console.log(pageSizeNumber);
  console.log(convertDataNewstoJS);
  pageNumCalc();
  renderNews();
  // console.log("1");
};

getData();

// ---------------------- calculate and process page number, next and pre button -----------------------------

const pageNumCalc = function () {
  numMaxOfPage = Math.round(convertDataNewstoJS.totalResults / pageSizeNumber);
  if (numMaxOfPage % 2 !== 0)
    // numMaxOfPage = numMaxOfPage + 1;
    console.log(numMaxOfPage);
  renderNumberOfPage();
  let preBtn = document.getElementById("btn-prev");
  let nextBtn = document.getElementById("btn-next");
  let pageNum = document.getElementById("page-num");
  // console.log("true");
  // let pageDown = numOfPage;
  // let pageUp = numOfPage;
  // console.log(`pageDown: ${pageDown}, pageUp: ${pageUp}`);
  // preBtn.classList.add("hidden");
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
