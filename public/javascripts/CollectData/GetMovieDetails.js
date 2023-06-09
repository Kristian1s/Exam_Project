const { getTop100Titles, getAdditionalMovies } = require("./GetMoviesFromApis.js");
require('dotenv').config();

async function GetMovieDetails() {
  const movies = await getTop100Titles();
  const additionalMovies = await getAdditionalMovies();
  const movieDetails = []; // Array to store movie details

  try {
    // Fetch details for top 100 movies
    await Promise.all(
      movies.map(async (movie) => {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.MOVIEAPIKEY}&t=${encodeURIComponent(
              movie.title
            )}`
          );
          const data = await response.json();
          movieDetails.push(data);
        } catch (error) {
          console.error(`Error fetching details for movie: ${movie.title}`, error);
        }
      })
    );

    // Fetch details for additional movies
    await Promise.all(
      additionalMovies.map(async (movie) => {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.MOVIEAPIKEY}&t=${encodeURIComponent(
              movie.title
            )}`
          );
          const data = await response.json();

          movieDetails.push(data);
        } catch (error) {
          console.error(`Error fetching details for additional movie: ${movie.title}`, error);
        }
      })
    );

    const sortedMovies = movieDetails.sort(
      (a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
    );
    return sortedMovies;
    
  } catch (error) {
    console.error('Error occurred while fetching movie details:', error);
    return []; // Return an empty array if an error occurs
  }
}

module.exports = { GetMovieDetails };
