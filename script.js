//You can edit ALL of the code here

let allEpisodes = getAllEpisodes();
let headerContainer = document.getElementById("header-container");
let logos = document.getElementById("logo");
// headerContainer.appendChild(logos);
// let imgLogo = document.createElement("img");
let videoLogo = document.createElement("video");
videoLogo.classList.add("video-logo");
videoLogo.src = "logoVideo.mp4";
videoLogo.autoplay = true;
videoLogo.loop = true;
videoLogo.muted = true;
// imgLogo.src = "logoImg.png";
// imgLogo.classList.add("logo-img");
logos.appendChild(videoLogo);
// logos.appendChild(imgLogo);
// headerContainer.insertBefore(imgLogo, logos);
headerContainer.insertBefore(videoLogo, logos);

//Level 350 - Switch to fetching live data!
function fetchAllEpisodes(series) {
  return fetch(`https://api.tvmaze.com/shows/${series}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function tvSeriesSetup(showList) {
  let selectSeries = document.getElementById("show-select");
  let optionSeries = document.createElement("option");
  optionSeries.textContent = "Please Choose Your Show";
  selectSeries.appendChild(optionSeries);
  selectSeries.selectedIndex = 0;

  //sorting based on alphabetical order

  // showList.sort(function (a, b) {
  //   return a.name.localeCompare(b.name);
  // });
  // showList.sort();
  // console.log(showList);
  showList.sort((a, b) => {
    //even though top one is working tried another one for sorting alphabetical order. will delet when i final refactor.
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  for (let i = 0; i < showList.length; i++) {
    let option = document.createElement("option");
    option.value = showList[i].id;
    option.textContent = `${showList[i].name}`;
    selectSeries.appendChild(option);
  }
  selectSeries.addEventListener("change", function () {
    fetchAllEpisodes(selectSeries.value);
  });
}
function setup() {
  const showList = getAllShows();
  // PageForShows(showList);
  tvSeriesSetup(showList);
  makePageForEpisodes(allEpisodes);
}

//its optional will refactor later
// function setup() {
//   const seriesList = getAllShows();
//   tvSeriesSetup(seriesList);
// }
//creating search bar//
const searchElem = document.querySelector("#search");
searchElem.addEventListener("input", searchEpisode);
function searchEpisode() {
  const searchInput = searchElem.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode) => {
    if (
      (episode.name && episode.name.toLowerCase().includes(searchInput)) ||
      (episode.summary && episode.summary.toLowerCase().includes(searchInput))
    ) {
      return true;
    }
    return false;
  });

  document.querySelector("#num").innerText = filteredEpisodes.length;
  makePageForEpisodes(filteredEpisodes);
}
// //creating function//
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = "";

  //top container which will wrap all movieCart
  const topContainer = document.createElement("div");
  topContainer.classList.add("top-container");
  rootElem.appendChild(topContainer);
  for (let i = 0; i < episodeList.length; i++) {
    //this is movieCard in which all title, photo and summery will be appended.
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    const testElement = document.createElement("p");
    movieCard.appendChild(testElement);
    topContainer.appendChild(movieCard);

    //Assigning TV episodes in p element
    let episodeName = document.createElement("p");
    episodeName.classList.add("epName");
    movieCard.appendChild(episodeName);

    //assigning the season number & episode number//
    episodeSeason = episodeList[i].season;
    episodeNumber = episodeList[i].number;
    if (episodeSeason < 10) {
      episodeSeason = "0" + episodeSeason;
    }
    if (episodeNumber < 10) {
      episodeNumber = "0" + episodeNumber;
    }
    episodeName.innerText = `${episodeList[i].name} - S${episodeSeason}E${episodeNumber}`;
    // episodeList[i].name +
    // " " +
    // "-" +
    // " " +
    // "S" +
    // episodeSeason +
    // "E" +
    // episodeNumber;

    //creating image container div//
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    movieCard.appendChild(imageContainer);

    //creating episodeImage
    let episodeImage = document.createElement("img");
    imageContainer.appendChild(episodeImage);
    episodeImage.src = episodeList[i].image.medium;

    //creating summary div//
    let summaryContainer = document.createElement("div");
    summaryContainer.classList.add("summary-container");
    movieCard.appendChild(summaryContainer);

    //creating episodeSummary//
    const episodeSummary = document.createElement("p");
    summaryContainer.appendChild(episodeSummary);
    summaryContainer.innerHTML = `${episodeList[i].summary}`;

    ///creating div for level 300 and appended rootElm inside
    let episodeDivContainer = document.createElement("div"); //created div for selector
    episodeDivContainer.classList.add("episode-container"); //assign class
    episodeDivContainer.id = "episode-container" + i; // assigned unique id for div based on value of i.
    rootElem.appendChild(episodeDivContainer); //appended to root element
  }

  //creating select bar for episodes for level 300

  let selectElem = document.querySelector("#selector");
  let optionElem = document.createElement("option");
  optionElem.innerText = "Please Choose Your Episodes";
  selectElem.appendChild(optionElem);

  allEpisodes.forEach((ele) => {
    let options = document.createElement("option");
    options.value = ele.name; //assigns the name property of the ele object to the value property of the options element.
    options.innerText = `${ele.name} - S${ele.season
      .toString()
      .padStart(2, "0")}E${ele.number.toString().padStart(2, "0")}`;
    selectElem.appendChild(options);
  });

  selectElem.addEventListener("change", function () {
    let selectOption = selectElem.selectedIndex - 1;
    let episodeDivContainer = document.getElementById(
      "episode-container" + selectOption
    );
    episodeDivContainer.scrollIntoViewIfNeeded({ behavior: "smooth" });
  });
}

////////level-500////////
function PageForShows(showList) {
  const showListPage = document.getElementById("show-page");
  showListPage.innerHTML = "";
  for (let i = 0; i < showList.length; i++) {
    // Create elements
    let divCardShow = document.createElement("div");
    let divTitleShow = document.createElement("div");
    let imgShow = document.createElement("img");
    let summaryShow = document.createElement("p");

    // Assign classes for elements
    divCardShow.classList.add("div-show");
    divTitleShow.classList.add("title-show");
    imgShow.classList.add("img-show");
    summaryShow.classList.add("p-show");

    // Assign content to elements
    divTitleShow.innerHTML = `${showList[i].name}`;
    imgShow.src = `${showList[i].image.medium}`;
    summaryShow.innerHTML = `${showList[i].summary}`;

    // Append elements to parent element
    divCardShow.appendChild(divTitleShow);
    divCardShow.appendChild(imgShow);
    divCardShow.appendChild(summaryShow);
    showListPage.appendChild(divCardShow);
  }
}

// function PageForShows(showList) {
//   const rootElem = document.getElementById("root");
//   const showListPage = document.getElementById("show-page");
//   showListPage.innerHTML = "";
//   for (let i = 0; i < showList.length; i++) {
//     //create element
//     let divCardShow = document.createElement("div");
//     let divTitleShow = document.createElement("div");
//     let imgShow = document.createElement("img");
//     let summaryShow = document.createElement("p");
//     let linkShow = document.createElement("a");

//     //assigning class for element
//     divCardShow.classList.add("div-show");
//     divTitleShow.classList.add("title-show");
//     imgShow.classList.add("img-show");
//     summaryShow.classList.add("p-show");
//     linkShow.classList.add("link-show");

//     // assigning content in element
//     document.getElementById("divTitleShow");
//     document.getElementById("imgShow");
//     document.getElementById("summaryShow");
//     divTitleShow.innerHTML = `${showList[i].name}`;
//     imgShow.src = `${showList[i].image.medium}`;
//     summaryShow.innerHTML = `${showList[i].summary}`;

//     // appending to parent element
//     divCardShow.appendChild(divTitleShow);
//     divCardShow.appendChild(imgShow);
//     divCardShow.appendChild(summaryShow);
//     showListPage.appendChild(divCardShow);
//   }
//   rootElem.appendChild(showListPage);
// }

//creating footer
let footerEle = document.getElementById("footer");
const footerLink = document.createElement("a");
footerLink.href = "https://www.tvmaze.com/";
const textNode = document.createTextNode(
  "Copyright 2020. All data comes from: "
);
footerEle.appendChild(textNode);
footerLink.textContent = "www.tvmaze.com";
footerEle.appendChild(footerLink);

window.onload = setup;
