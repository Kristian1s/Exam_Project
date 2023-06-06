function handleReview(username, movieId) {
    // Create a container div
    const container = document.createElement('div');
    
    // Create a select element for the rating
    const ratingSelect = document.createElement('select');
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      ratingSelect.appendChild(option);
    }
    
    // Create a textarea element for the review text
    const textarea = document.createElement('textarea');
    textarea.rows = 5;
    
    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    
    // Append rating select, textarea, and submit button to the container div
    container.appendChild(ratingSelect);
    container.appendChild(textarea);
    container.appendChild(submitButton);
    
    // Add event listener to the submit button
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
    
    // Append the container div to the desired element in the DOM
    const reviewWrapper = document.querySelector('.reviewWrapper');
    reviewWrapper.appendChild(container);
  }
  