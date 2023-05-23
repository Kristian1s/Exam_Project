var { GetTop100Titles } = require("./GetTop100Titles.js");

async function GetMovieDetails() {
  const movies = await GetTop100Titles();
  const movieDetails = []; // Array to store movie details

  // Iterate through each movie and fetch its details
  await Promise.all(
    movies.map(async (movie) => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=dda73268&t=${encodeURIComponent(
          movie.title
        )}`
      );
      const data = await response.json();
      movieDetails.push(data);
    })
  );

  const sortedMovies = movieDetails.sort(
    (a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
  );

  return sortedMovies;
}
module.exports = { GetMovieDetails };
