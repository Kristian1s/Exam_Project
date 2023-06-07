const { getActors } = require("./Actors")
const { getDirectors } = require("./Directors")
const { getGenres } = require("./Genres")
const { getRating } = require("./Rating")
const { getYears } = require("./Years")
const { getMovie } = require("./Movie")
const {movieActors} = require("./MovieActors")
const {movieGenres} = require("./MovieGenres")

async function writeDataToDb() {


  try {
    const genresData = await getGenres();
    console.log('---Genres added to database---');

    const yearsData = await getYears();
    console.log('---Years added to database---'); 
    const directorsData = await getDirectors();
    console.log('---Directors added to database---' );
    
     const actorsData = await getActors();
    console.log('---Actors added to database---');
    
    const ratingData = await getRating();
    console.log('---Ratings added to database---');

    const movieData = await getMovie();
    console.log('---Movies added to database---');
  
    const movieActorsData = await movieActors();
    console.log('---Movie Actors added to database---');
  
  
    const movieGenresData = await movieGenres();
    console.log('---Movie Genres added to database---');
  }
   catch (error) {
    console.error(error);
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
  }
}
   
  
  module.exports = { writeDataToDb };