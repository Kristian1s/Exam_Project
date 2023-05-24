const { GetMovieDetails } = require("./GetMovieDetails.js");

async function movieGenres() {
  let movieGenres = [];
  let movieDetails = await GetMovieDetails();
  movieDetails.forEach(function (movie) {
    const title = movie.Title;
    const genres = movie.Genre.split(",");
    const trimmedGenres = genres.map(genre => genre.trim());
    movieGenres.push({
      title: title,
      genres: trimmedGenres,
      
    })
  }
);

movieGenres.forEach(function (movie) {
    const { title, genres} = movie;
  fetch("http://localhost:3000/apiScript/movieGenres", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
        Title: title,
        Genres: genres
    }),
  })
   /*  .then(response => {
      if (response.ok) {
        console.log(`Data sent`);
      } else {
        console.error(`Error sending data`);
      }
    })
    .catch(error => {
      console.error("Error sending data");
    }); */
});}
module.exports = { movieGenres };
