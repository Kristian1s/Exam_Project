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


  fetch("http://localhost:3000/apiScript/year", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      YearsArray: yearsArray,
    }),
  })
}
module.exports = {getYears}