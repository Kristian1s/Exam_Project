const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getYears(){
let yearsArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
  if (movie.Year) {
    // Check if Genre property exists
    const years = movie.Year.split(",");

    years.forEach(function (year) {
      const trimmedYear = year.trim();

      if (!yearsArray.includes(trimmedYear)) {
        yearsArray.push(trimmedYear);
      }
    });
  }
});

yearsArray.forEach(function (year) {
  fetch("http://localhost:3000/apiScript/year", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Year: year,
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log(`Year '${year}' sent successfully.`);
      } else {
        console.error(`Error sending year '${year}'. Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error(`Error sending year '${year}':`, error);
    });
});}
module.exports = {getYears}