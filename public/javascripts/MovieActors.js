const { GetMovieDetails } = require("./GetMovieDetails.js");

async function movieActors() {
  let movieActors = [];
  let movieDetails = await GetMovieDetails();
  movieDetails.forEach(function (movie) {
    const title = movie.Title;
    const actors = movie.Actors.split(",");
    movieActors.push({
      title: title,
      actors: actors,
      
    })
  }
);

movieActors.forEach(function (movie) {
    const { title, actors} = movie;
  fetch("http://localhost:3000/apiScript/movieActors", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
        Title: title,
        Actors: actors
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log(`Data sent`);
      } else {
        console.error(`Error sending data`);
      }
    })
    .catch(error => {
      console.error("Error sending data");
    });
});}
module.exports = { movieActors };
