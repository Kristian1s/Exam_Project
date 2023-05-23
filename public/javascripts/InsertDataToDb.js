const { getActors } = require("./Actors")
const { getDirectors } = require("./Directors")
const { getGenres } = require("./Genres")
const { getRating } = require("./Rating")
const { getYears } = require("./Years")
const { getMovie } = require("./Movie")



async function writeDataToDb() {
  const genresData = await getGenres();
  const yearsData = await getYears();
  const directorsData = await getDirectors();
  const actorsData = await getActors();
  const ratingData = await getRating();

  const movieData = await getMovie();
  
  // Rest of the code for data insertion into the database
}
  
  module.exports = { writeDataToDb };