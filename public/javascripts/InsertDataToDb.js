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
    console.log('---Genres added to database---');

    const yearsData = await getYears();
    console.log('---Years added to database---'); 
    const directorsData = await getDirectors();
    console.log('---Directors added to database---' );
    
     const actorsData = await getActors();
    console.log('---Actors added to database---');
    
    const ratingData = await getRating();
    console.log('---Ratings added to database---');

    setTimeout(async () => {
      const movieData = await getMovie();

      setTimeout(async () => {
        const movieActorsData = await movieActors();
        /* const movieGenreData = await movieGenres(); */
      }, 3000); 
    }, 3000);  
 
    
     
     
     
    
}
  
  module.exports = { writeDataToDb };