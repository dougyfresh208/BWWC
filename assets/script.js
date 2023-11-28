// Global variable to store the circle overlay
var circle;

// Function to initialize the Google Map
function initMap() {
    // Set the center and zoom level for the map
    var mapOptions = {
        center: { lat:  40.377937, lng: -111.803055 }, // Example: San Francisco, CA
        zoom: 13,
    };

    // Create a new map instance
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Set a marker at the center of the map (you can customize this)
    var marker = new google.maps.Marker({
        position: { lat: 40.377937, lng: -111.803055 },
        map: map,
        title: "Marker Title",
    });

    // Create a circle overlay with initial radius (in meters)
    circle = new google.maps.Circle({
        map: map,
        radius: 5000, // Initial radius (adjust as needed)
        fillColor: "#4285F4", // Circle color
        fillOpacity: 0.2, // Circle opacity
        strokeColor: "#4285F4", // Circle border color
        strokeOpacity: 0.8, // Circle border opacity
        strokeWeight: 2, // Circle border weight
    });

    // Set the circle's center to the marker's position
    circle.bindTo("center", marker, "position");

    // Call the function to update the circle when the slider changes
    document.getElementById("radiusSlider").addEventListener("input", updateCircle);
}

// Function to update the circle radius based on the slider value
function updateCircle() {
    // Get the slider value
    var sliderValue = document.getElementById("radiusSlider").value;

    // Update the circle radius (convert miles to meters)
    circle.setRadius(sliderValue * 1609.34);

    // Update the display text
    document.getElementById("radiusDisplay").innerText = sliderValue + " miles";
}

// Function to be called when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    // Call the initMap function when the document is ready
    initMap();
});






// function search() {
//     // Get user input values
//     const distance = document.getElementById('distance').value;
//     const price = document.getElementById('price').value;
//     const foodType = document.getElementById('foodType').value;
//     const rating = document.getElementById('rating').value;
//     const radius = document.getElementById('radius').value;
//     // You can use these values to make API calls or perform other actions
//     // For simplicity, let's just log the values for now
//     console.log('Search Criteria:');
//     console.log('Distance:', distance);
//     console.log('Price:', price);
//     console.log('Food Type:', foodType);
//     console.log('Rating:', rating);
//     console.log('Radius:', radius);
//     // Call a function to select a random restaurant based on the criteria
//     selectRandomRestaurant();
//   }
//   // Function to select a random restaurant (placeholder)
//   function selectRandomRestaurant() {
//     // In a real application, you would make API calls here to fetch restaurant data
//     // For now, let's just create a sample array of restaurants
//     const restaurants = [
//       { name: 'Restaurant A', rating: 4.5, distance: 3 },
//       { name: 'Restaurant B', rating: 3.8, distance: 5 },
//       { name: 'Restaurant C', rating: 4.2, distance: 2 },
//       // Add more restaurants as needed
//     ];
//     // Filter restaurants based on user criteria (distance, rating, etc.)
//     const filteredRestaurants = restaurants.filter(restaurant => {
//       return restaurant.distance <= parseInt(document.getElementById('distance').value) &&
//              restaurant.rating >= parseInt(document.getElementById('rating').value);
//       // Add more criteria as needed
//     });
//     // Select a random restaurant from the filtered list
//     const randomRestaurant = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
//     // Display the selected restaurant's details (you can update your UI accordingly)
//     console.log('Randomly Selected Restaurant:');
//     console.log('Name:', randomRestaurant.name);
//     console.log('Rating:', randomRestaurant.rating);
//     console.log('Distance:', randomRestaurant.distance);
//     // Save the result to local storage
//     saveResultToLocalStorage(randomRestaurant);
//   }
//   // Function to save the result to local storage
//   function saveResultToLocalStorage(restaurant) {
//     // Retrieve existing results from local storage or initialize an empty array
//     const pastResults = JSON.parse(localStorage.getItem('pastResults')) || [];
//     // Add the new result to the array
//     pastResults.push(restaurant);
//     // Save the updated array back to local storage
//     localStorage.setItem('pastResults', JSON.stringify(pastResults));
//     // Display the past results on the page (you can update your UI accordingly)
//     console.log('Past Results:', pastResults);
//   }
//   // You can add more functions as needed and integrate with mapping APIs for a real application
