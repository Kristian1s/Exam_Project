const { GetMovieDetails } = require("./GetMovieDetails.js");

async function movieActors() {
  let movieActors = [];
  let movieDetails = await GetMovieDetails();
  movieDetails.forEach(function (movie) {
    if (movie.Actors) {
      const title = movie.Title; 
      const actors = movie.Actors.split(",");
    const trimmedActors = actors.map(actor => actor.trim());
    if(title !== "Blank"){
    movieActors.push({
      title: title,
      actors: trimmedActors,
    })}
  }
}
);

  fetch("http://localhost:3000/apiScript/movieActors", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
        MovieActorArray: movieActors
    }),
  })
}
module.exports = { movieActors };
