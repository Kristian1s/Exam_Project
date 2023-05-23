const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getRating(){
let ratingArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
  if (movie.imdbRating) {
    // Check if Genre property exists
    const ratings = movie.imdbRating.split(",");
    ratings.forEach(function (rating) {
      const trimmedRating = rating.trim();

      if (!ratingArray.includes(trimmedRating)) {
        ratingArray.push(trimmedRating);
      }
    });
  }
});

ratingArray.forEach(function (rating) {
  fetch("http://localhost:3000/apiScript/rating", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Rating: rating,
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log(`Rating '${rating}' sent successfully.`);
      } else {
        console.error(`Error sending rating '${rating}'. Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error(`Error sending rating '${rating}':`, error);
    });
});}
module.exports = {getRating}