// Global variables to store the circle overlay and map
var circle, map;

// Function to initialize the Google Map
function initMap() {
    // Set the center and zoom level for the map
    var mapOptions = {
        center: { lat: 40.377937, lng: -111.803055 }, // Example: San Francisco, CA
        zoom: 11,
    };

    // Create a new map instance
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Set a marker at the center of the map
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

    // Call the function to handle the "Generate" button click
    document.getElementById("generateResult").addEventListener("click", generateResult);
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

// Function to handle the "Use current location" button click
document.getElementById('useLocationBtn').addEventListener('click', getLocation);

function getLocation() {
    const apiKey = 'AIzaSyBo_mdO9-w5vxlVtKqgJY3-D--jfXBGYqY';
    const apiUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;
    const wifiAccessPoints = [
        {
            macAddress: '01:23:45:67:89:AB',
            signalStrength: -65,
            signalToNoiseRatio: 40
        },
        {
            macAddress: '01:23:45:67:89:CD',
            signalStrength: -75,
            signalToNoiseRatio: 30
        }
    ];

    const requestBody = {
        considerIp: true,
        wifiAccessPoints: wifiAccessPoints
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log('Location:', data.location);

            // Update the map center and circle center
            map.setCenter(data.location);
            circle.setCenter(data.location);

            // Add a marker for the current location
            var currentLocationMarker = new google.maps.Marker({
                position: data.location,
                map: map,
                title: "Current Location",
                animation: google.maps.Animation.DROP,
            });

            // Pan the map to the new marker
            map.panTo(data.location);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            alert('Error getting location. Please check the console for details.');
        });
}

// Function to be called when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    // Call the initMap function when the document is ready
    initMap();
});
