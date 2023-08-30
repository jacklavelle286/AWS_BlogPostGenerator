// Function to update the progress bar
function updateProgressBar(progress) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
  }
  
  // Function to show the progress bar
  function showProgressBar() {
    // Show the progress bar container
    document.getElementById('progressBarContainer').style.display = 'block';
    // Start with 0% progress
    updateProgressBar(0);
  }
  
  // Function to hide the progress bar
  function hideProgressBar() {
    // Hide the progress bar container
    document.getElementById('progressBarContainer').style.display = 'none';
  }
  
  // Attach the function to the button click event
  document.getElementById('generateBtn').addEventListener('click', () => {
    // Show the progress bar
    showProgressBar();
  
    // Start slow progress increment for the first half
    let progress = 0;
    const slowProgressFirstHalf = setInterval(() => {
      if (progress < 45) {
        progress += 1;
        updateProgressBar(progress);
      } else {
        clearInterval(slowProgressFirstHalf);
      }
    }, 200);
  
    // Trigger Lambda function via function url
    fetch('https://n75isgcriscpgflxryuhqw6aem0hydkh.lambda-url.us-east-1.on.aws/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        clearInterval(slowProgressFirstHalf);
        updateProgressBar(50);
  
        // Start slow progress increment for the second half
        const slowProgressSecondHalf = setInterval(() => {
          if (progress < 70) {
            progress += 1;
            updateProgressBar(progress);
          } else {
            clearInterval(slowProgressSecondHalf);
          }
        }, 300);
  
        return response.json();
      })
      .then(data => {
        return fetch(data.presigned_url);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        updateProgressBar(75);
        return response.text();
      })
      .then(text => {
        updateProgressBar(100);
        setTimeout(hideProgressBar, 500);
        document.getElementById("blogContent").value = text;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        hideProgressBar();
      });
  });
  