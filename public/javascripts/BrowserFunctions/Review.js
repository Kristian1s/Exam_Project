var isReviewing = false;

function handleReview(username, movieId) {
    const container = document.createElement('div');
    

    const ratingSelect = document.createElement('select');
    const ratingLabel = document.createElement('label');
    ratingLabel.textContent = 'Rating: '; 
    
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      ratingSelect.appendChild(option);
    }

    container.appendChild(ratingLabel);
    container.appendChild(ratingSelect);
    

    const textarea = document.createElement('textarea');
    textarea.rows = 5;
    

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    

    container.appendChild(ratingSelect);
    container.appendChild(textarea);
    container.appendChild(submitButton);
    

    submitButton.addEventListener('click', () => {
      const rating = ratingSelect.value;
      const reviewText = textarea.value.trim();
      
      if (reviewText !== '') {
        fetch('/movie/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            rating,
             review: reviewText,
             UserName: username,
             MovieId: movieId
             }),
        })
          .then((response) => {
            if (response.ok) {
                location.reload();
              console.log('Review submitted');
            } else {
              console.error('Failed to submit review');
            }
          })
          .catch((error) => {
            console.error('Failed to submit review', error);
          });
      }
    });
    
    if(!isReviewing){
      isReviewing = true;
      const reviewBox = document.querySelector('.reviewBox');
      reviewBox.appendChild(container);
    }
  }
  