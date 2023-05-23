async function GetTop100Titles() {
 
    const response = await fetch("https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json");
    const data = await response.json();
  
    // Sort the movies by rank
    const sortedMovies = data.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
  
    return sortedMovies;
  }

module.exports ={GetTop100Titles};