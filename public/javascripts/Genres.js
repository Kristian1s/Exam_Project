const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getGenres(){
let genreArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
  if (movie.Genre) {
    // Check if Genre property exists
    const genres = movie.Genre.split(","); // Split genres by comma to handle multiple genres

    genres.forEach(function (genre) {
      const trimmedGenre = genre.trim(); // Remove leading/trailing spaces from genre

      if (!genreArray.includes(trimmedGenre)) {
        genreArray.push(trimmedGenre);
      }
    });
  }
});

genreArray.forEach(function (genre) {
  fetch("http://localhost:3000/apiScript/genre", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      genreName: genre,
    }),
  })
   /*  .then(response => {
      if (response.ok) {
        console.log(`Genre '${genre}' sent successfully.`);
      } else {
        console.error(`Error sending genre '${genre}'. Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error(`Error sending genre '${genre}':`, error);
    }); */
});}
module.exports = {getGenres}