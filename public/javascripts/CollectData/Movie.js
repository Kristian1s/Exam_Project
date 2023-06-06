const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getMovie(){
let movieArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
    const title = movie.Title || "Blank";
    const plot = movie.Plot;
    const runtime = movie.Runtime && movie.Runtime.endsWith("min") ? movie.Runtime.slice(0, -4) : "";
    const poster = movie.Poster;
    const director = movie.Director && movie.Director.split(",")[0]?.trim();
    const year = movie.Year;
    const rating = parseFloat(movie.imdbRating);

    if (director !== "N/A" && title !== "Blank") {
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
})
  fetch("http://localhost:3000/apiScript/movie", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      MovieArray: movieArray
    }),
  })
}
module.exports = {getMovie}