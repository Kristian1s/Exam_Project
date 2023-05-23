const { getActors } = require("./Actors")
const { getDirectors } = require("./Directors")
const { getGenres } = require("./Genres")
const { getRating } = require("./Rating")
const { getYears } = require("./Years")
const { getMovie } = require("./Movie")



async function writeDataToDb(){
const promise = new Promise((resolve, reject) =>{
    
})
getGenres()
getYears()
getDirectors()
getActors()
getRating()
}



getMovie()
module.exports = {writeDataToDb}