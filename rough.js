function fetchAllEpisodes() {
  return fetch(`https://api.tvmaze.com/shows/${series}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("error", error);
    });
}

fetch(www.dfdjf)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("error", error);
  });
