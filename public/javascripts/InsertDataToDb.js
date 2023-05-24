const { getActors } = require("./Actors")
const { getDirectors } = require("./Directors")
const { getGenres } = require("./Genres")
const { getRating } = require("./Rating")
const { getYears } = require("./Years")
const { getMovie } = require("./Movie")
const {movieActors} = require("./MovieActors")
const {movieGenres} = require("./MovieGenres")

async function writeDataToDb() {
    const genresData = await getGenres();
    const yearsData = await getYears();
    const directorsData = await getDirectors();
    const actorsData = await getActors();
    const ratingData = await getRating();

    const movieData = await getMovie();

    setTimeout(async () => {
      const movieActorsData = await movieActors();
      const movieGenreData = await movieGenres();
      // Continue with any additional operations or handle the data here
    }, 1000); // Delay of 1000 milliseconds (1 second)
}
  
  module.exports = { writeDataToDb };