const {GetMovieDetails} = require("./GetMovieDetails.js");

async function getYears(){
let yearsArray = [];
let movieDetails = await GetMovieDetails();
movieDetails.forEach(function (movie) {
  if (movie.Year) {
    const years = movie.Year;

      if (!yearsArray.includes(years)) {
        yearsArray.push(years);
      }
   
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
   /*  .then(response => {
      if (response.ok) {
        console.log(`Year '${year}' sent successfully.`);
      } else {
        console.error(`Error sending year '${year}'. Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error(`Error sending year '${year}':`, error);
    }); */
});}
module.exports = {getYears}