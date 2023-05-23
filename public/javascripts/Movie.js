const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getMovie(){
let movieArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
    const title = movie.Title;
    const plot = movie.Plot;
    const runtime = movie.Runtime.slice(0, -4)
    const poster = movie.Poster;
    movieArray.push({
        title: title,
        plot: plot,
        runtime: runtime,
        poster: poster
    })
  }
);

movieArray.forEach(function (movie) {
    const { title, plot, runtime, poster} = movie;
  fetch("http://localhost:3000/apiScript/movie", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
        Title: title,
        Plot: plot,
        Runtime: runtime,
        Poster: poster,
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log(`Movie '${movie}' sent successfully.`);
      } else {
        console.error(`Error sending movie '${movie}'. Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error(`Error sending movie '${movie}':`, error);
    });
});}
module.exports = {getMovie}