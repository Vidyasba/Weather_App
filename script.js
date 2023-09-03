// Get a reference to the "Fetch Data" button
const fetchDataButton = document.querySelector('button');

// Add a click event listener to the button
fetchDataButton.addEventListener('click', () => {
  // Check if Geolocation is available in the user's browser
  if ('geolocation' in navigator) {
    // Use the Geolocation API to get the user's current position
    navigator.geolocation.getCurrentPosition((position) => {
      // Extract the latitude and longitude from the position object
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Redirect the user to another page with the latitude and longitude as URL parameters
      window.location.href = `result.html?latitude=${latitude}&longitude=${longitude}`;
    }, (error) => {
      // Handle any errors that may occur during geolocation
      alert(`Error getting location: ${error.message}`);
    });
  } else {
    // Geolocation is not available in the user's browser
    alert('Geolocation is not available in your browser');
  }
});
