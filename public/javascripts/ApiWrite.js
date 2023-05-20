async function get100Titles() {
 
  const response = await fetch("https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json");
  const data = await response.json();

  // Sort the movies by rank
  const sortedMovies = data.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));

  return sortedMovies;
}
 

async function storeMovieDetails() {
  const movies = await get100Titles();
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
  let genreArray = [];
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
    fetch("http://localhost:3000/apiScript/genre", { // Replace with your server's URL
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        genreName: genre,
      }),
    })
      .then(response => {
        if (response.ok) {
          console.log(`Genre '${genre}' sent successfully.`);
        } else {
          console.error(`Error sending genre '${genre}'. Status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error(`Error sending genre '${genre}':`, error);
      });
  });
  

  return movieDetails;
}
module.exports = { get100Titles, storeMovieDetails };
