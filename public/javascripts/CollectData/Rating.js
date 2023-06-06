const { GetMovieDetails } = require("./GetMovieDetails.js");

async function getRating() {
  let ratingArray = [];
  let movieDetails = await GetMovieDetails();
  movieDetails.forEach(function (movie) {
    if (movie.imdbRating) {
      const rating = parseFloat(movie.imdbRating);

      if (!ratingArray.includes(rating)) {
        ratingArray.push(rating);
      }
    }
  });

  fetch("http://localhost:3000/apiScript/rating", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      RatingsArray: ratingArray,
    }),
  });
}
module.exports = { getRating };
