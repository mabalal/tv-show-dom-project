//You can edit ALL of the code here

let allEpisodes = getAllEpisodes();
function setup() {
  makePageForEpisodes(allEpisodes);
}

//creating select bar for episodes for level 300
let selectElem = document.querySelector("#selector");
let optionElem = document.createElement("option");
optionElem.innerText = "Please Choose Your Episodes";
selectElem.appendChild(optionElem);

allEpisodes.forEach((ele) => {
  let options = document.createElement("option");
  options.value = ele.name;
  options.innerText = `S${ele.season.toString().padStart(2, "0")}E${ele.number
    .toString()
    .padStart(2, "0")}- ${ele.name}`;
  selectElem.appendChild(options);
});

selectElem.addEventListener("change", function () {
  //we will clear the container
  let clearContainer = document.querySelector(".top-Container");
  console.log(clearContainer);
  //find the selected movie-card
  //add that card in that container

  // let selectedEpisode = selectElem.value;
  // let episodes = Array.from(document.getElementsByClassName("movie-card"));
  // episodes.forEach((episode) => {
  //   let h1Element = document.querySelector("h1");
  //   console.log(h1Element);
  //   if (h1Element.innerText.includes(selectedEpisode)) {
  //     episode.style.display = "block";
  //     document.querySelector("#num").innerText = 1;
  //   } else {
  //     episode.style.display = "none";
  //   }
  // });
});

//creating search bar//
searchElem = document.querySelector("#search");
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
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  //top container
  const topContainer = document.createElement("div");
  topContainer.classList.add("top-Container");
  rootElem.appendChild(topContainer);
  for (let i = 0; i < episodeList.length; i++) {
    //this is movieCart
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
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
    let summeryContainer = document.createElement("div");
    summeryContainer.classList.add("summary-container");
    movieCard.appendChild(summeryContainer);

    //creating episodeSummary//
    const episodeSummary = document.createElement("p");
    summeryContainer.appendChild(episodeSummary);
    summeryContainer.innerHTML = `${episodeList[i].summary}`;
  }
  console.log(episodeList);

  //creating footer
  let footerEle = document.getElementById("footer");
  const footerLink = document.createElement("a");
  footerLink.href = "https://www.tvmaze.com/";
  footerLink.textContent = "data from tvmaze.com";
  footerEle.appendChild(footerLink);
}
window.onload = setup;
