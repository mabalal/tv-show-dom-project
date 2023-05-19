//You can edit ALL of the code here

let allEpisodes = getAllEpisodes();
function setup() {
  makePageForEpisodes(allEpisodes);
}

// headerContainer.classList.add("header-container");

//creating search bar//
const searchElem = document.querySelector("#search");
searchElem.addEventListener("input", searchEpisode);
function searchEpisode() {
  const searchInput = searchElem.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode) => {
    if (
      episode.name.toLowerCase().includes(searchInput) ||
      episode.summary.toLowerCase().includes(searchInput)
    ) {
      return episode;
    }
  });

  document.querySelector("#num").innerText = filteredEpisodes.length;
  makePageForEpisodes(filteredEpisodes);
}
//heading of number of episodes//
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = "";

  //top container
  const topContainer = document.createElement("div");
  topContainer.classList.add("top-container");
  rootElem.appendChild(topContainer);
  for (let i = 0; i < episodeList.length; i++) {
    //this is movieCard
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
    episodeName.innerText =
      episodeList[i].name +
      " " +
      "-" +
      " " +
      "S" +
      episodeSeason +
      "E" +
      episodeNumber;

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

    ///for select option 300
    let episodeDivContainer = document.createElement("div");
    episodeDivContainer.classList.add("episode-container");
    episodeDivContainer.id = "episode-container" + i;
    rootElem.appendChild(episodeDivContainer);
  }

  //creating select bar for episodes for level 300

  let selectElem = document.querySelector("#selector");
  let optionElem = document.createElement("option");
  optionElem.innerText = "Please Choose Your Episodes";
  selectElem.appendChild(optionElem);

  allEpisodes.forEach((ele) => {
    let options = document.createElement("option");
    options.value = ele.name;
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
}
window.onload = setup;
