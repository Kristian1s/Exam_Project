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
    console.log('genresData sent :');

    const yearsData = await getYears();
    console.log('yearsData sent :'); 
    const directorsData = await getDirectors();
    console.log('directorsData  SEnt:' );
    
     const actorsData = await getActors();
    console.log('actorsData  SEnt:');
    
    const ratingData = await getRating();


    setTimeout(async () => {
      const movieData = await getMovie();

      setTimeout(async () => {
        const movieActorsData = await movieActors();
        /* const movieGenreData = await movieGenres(); */
      }, 3000); 
    }, 3000);  
 
    
     
     
     
    
}
  
  module.exports = { writeDataToDb };