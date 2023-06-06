const { GetMovieDetails } = require("./GetMovieDetails.js");

async function getDirectors() {
  let directorArray = [];
  let movieDetails = await GetMovieDetails();
  movieDetails.forEach(function (movie) {
    if (movie.Director) {
      const directors = movie.Director.split(",");
      directors.forEach(function (director) {
        const trimmedDirector = director.trim();

        if (trimmedDirector !== "N/A" && !directorArray.includes(trimmedDirector)) {
          directorArray.push(trimmedDirector);
        }
      });
    }
  });

  fetch("http://localhost:3000/apiScript/director", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      DirectorArray: directorArray,
    }),
  });
}

module.exports = { getDirectors };