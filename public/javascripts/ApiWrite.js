async function getData() {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/550?api_key=6a1bd996ef94ac5a2174249827b1e01e");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
