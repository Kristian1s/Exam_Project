const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getMovie(){
let movieArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
    const title = movie.Title;
    const plot = movie.Plot;
    const runtime = movie.Runtime.slice(0, -4)
    const poster = movie.Poster;
    const director = movie.Director.split(",")[0].trim();
    const year = movie.Year;
    const rating = movie.imdbRating;
    movieArray.push({
        title: title,
        plot: plot,
        runtime: runtime,
        poster: poster,
        director: director,
        year: year,
        rating: rating
    })
  }
);

movieArray.forEach(function (movie) {
    const { title, plot, runtime, poster, director, year, rating} = movie;
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
        Director: director,
        Year: year,
        Rating: rating
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