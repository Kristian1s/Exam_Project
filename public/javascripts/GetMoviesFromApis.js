async function getTop100Titles() {
 
    const response = await fetch("https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json");
    const data = await response.json();
  
    const sortedMovies = data.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
  
    return sortedMovies;
  }


  async function getAdditionalMovies(){
    const response = await fetch("https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json");
    const data = await response.json();
   let moreMovies = data.movies;
   const movieTitlesToDelete = ["I-See-You.Com", "Shogun"];
   moreMovies = moreMovies.filter((movie) => !movieTitlesToDelete.includes(movie.title));
   
    return moreMovies;
  }
  
module.exports ={getTop100Titles, getAdditionalMovies};