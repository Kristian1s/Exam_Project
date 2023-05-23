const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getDirectors(){
let directorArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
  if (movie.Director) {
    const directors = movie.Director.split(",");
    directors.forEach(function (director) {
      const trimmedDirector = director.trim();

      if (!directorArray.includes(trimmedDirector)) {
        directorArray.push(trimmedDirector);
      }
    });
  }
});

directorArray.forEach(function (director) {
  fetch("http://localhost:3000/apiScript/director", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Name: director
    }),
})
.then(response => {
  if (response.ok) {
    console.log(`Director '${director}' sent successfully.`);
  } else {
    console.error(`Error sending director '${director}'. Status: ${response.status}`);
  }
})
.catch(error => {
  console.error(`Error sending director '${director}':`, error);
});
});}
module.exports = {getDirectors}