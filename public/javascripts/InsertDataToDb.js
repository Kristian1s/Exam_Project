const { getActors } = require("./Actors")
const { getDirectors } = require("./Directors")
const { getGenres } = require("./Genres")
const { getMovie } = require("./Movie")
const { getYears } = require("./Years")




function writeDataToDb(){
getGenres()
getYears()
getDirectors()
getActors()
getMovie()
}


module.exports = {writeDataToDb}