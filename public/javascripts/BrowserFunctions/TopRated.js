async function addToWatchlist(movieId, username){

    await fetch("/profile/watchlist", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            MovieId: movieId,
            UserName: username
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Added to watchlist';
            alert(resData);
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
    .catch((response) => {
        alert(response.statusText);
    }); 
    
}
