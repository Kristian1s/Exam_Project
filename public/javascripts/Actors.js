const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getActors(){
let actorsArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
  if (movie.Actors) {
    const actors = movie.Actors.split(",");

    actors.forEach(function (actor) {
      const trimmedActor = actor.trim();

      if (!actorsArray.includes(trimmedActor)) {
        actorsArray.push(trimmedActor);
      }
    });
  }
});

actorsArray.forEach(function (actor) {
  fetch("http://localhost:3000/apiScript/actor", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ActorName: actor,
    }),
  })
    /* .then(response => {
      if (response.ok) {
        console.log(`Actor '${actor}' sent successfully.`);
      } else {
        console.error(`Error sending actor '${actor}'. Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error(`Error sending actor '${actor}':`, error);
    }); */
});}
module.exports = {getActors}