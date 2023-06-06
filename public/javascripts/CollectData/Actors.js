const { GetMovieDetails } = require("./GetMovieDetails.js");

async function getActors() {
  let actorsArray = [];
  let movieDetails = await GetMovieDetails();

  movieDetails.forEach(async function (movie) {
    if (movie.Actors) {
      const actors = movie.Actors.split(",");

      actors.forEach(async function (actor) {
        const trimmedActor = actor.trim();
        if (trimmedActor) {
          if (!actorsArray.includes(trimmedActor)) {
            actorsArray.push(trimmedActor);
          }
        }
      });
    }
  });
  fetch("http://localhost:3000/apiScript/actor", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({
    ActorsArray: actorsArray,
  }),
})
}
;

module.exports = { getActors };
