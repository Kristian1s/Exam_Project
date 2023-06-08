async function addToWatchlist(movieId, username) {
    const response = await fetch("/profile/watchlist", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        MovieId: movieId,
        UserName: username
      })
    });
  
    if (response.ok) {
      const data = await response.json();
      alert(data.message);
    } else {
      alert("Error occurred while adding to watchlist");
    }
  }