/* async function getData() {
        try {
          let pages = 5;
          for(number = 0; number !=pages; number++){
          const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=6a1bd996ef94ac5a2174249827b1e01e&language=en-US&page=${number}`);
          const data = await response.json();
        }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
     
      }

module.exports = {getData} */