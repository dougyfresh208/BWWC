var circle, map, placesService;

function initMap() {
  var mapOptions = {
    center: { lat: 40.377937, lng: -111.803055 },
    zoom: 11,
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
    position: { lat: 40.377937, lng: -111.803055 },
    map: map,
    title: "Marker Title",
  });

  circle = new google.maps.Circle({
    map: map,
    radius: 5000,
    fillColor: "#4285F4",
    fillOpacity: 0.2,
    strokeColor: "#4285F4",
    strokeOpacity: 0.8,
    strokeWeight: 2,
  });

  circle.bindTo("center", marker, "position");

  placesService = new google.maps.places.PlacesService(map);

  document.getElementById("radiusSlider").addEventListener("input", updateCircle);

  document.getElementById("generateResult").addEventListener("click", function (event) {
    event.preventDefault();
    generateResult();
  });

  document.getElementById('useLocationBtn').addEventListener('click', function (event) {
    event.preventDefault();
    getLocation();
  });

  document.getElementById('clearList').addEventListener('click', function (event) {
    event.preventDefault();
    clearPreviousRestaurants();
  });

  document.addEventListener("DOMContentLoaded", function () {
    initMap();
    initAutocomplete();
  });
}

function updateResultContainer(place) {
  saveRestaurantToLocalStorage(place);
  document.getElementById('restaurantName').innerText = 'Restaurant: ' + place.name;
  document.getElementById('restaurantAddress').innerText = 'Address: ' + place.vicinity;
  document.getElementById('priceLevel').innerText = 'Price Level: ' + (place.price_level ? place.price_level : 'N/A');
  document.getElementById('rating').innerText = 'Rating: ' + (place.rating ? place.rating : 'N/A');
}

function generateResult() {
  var circleCenter = circle.getCenter();

  var request = {
    location: circleCenter,
    radius: circle.getRadius(),
    type: 'restaurant',
    key: 'AIzaSyBHeBzhIMst_moJaXl-g23xT55gjJ3_LiY',
  };

  placesService.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var randomIndex = Math.floor(Math.random() * results.length);
      var selectedPlace = results[randomIndex];


      updateResultContainer(selectedPlace);
    } else {
      console.error('Nearby Search failed. Status:', status);
      alert('Failed to retrieve nearby restaurants. Please check the console for details.');
    }
  });
}

function updateCircle() {
  var sliderValue = document.getElementById("radiusSlider").value;
  circle.setRadius(sliderValue * 1609.34);
  document.getElementById("radiusDisplay").innerText = sliderValue + " miles";
}

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
      map.setCenter(data.location);
      circle.setCenter(data.location);
      var currentLocationMarker = new google.maps.Marker({
        position: data.location,
        map: map,
        title: "Current Location",
        animation: google.maps.Animation.DROP,
      });
      map.panTo(data.location);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error getting location. Please check the console for details.');
    });
}

function saveRestaurantToLocalStorage(restaurant) {
  let previousRestaurants = JSON.parse(localStorage.getItem('previousRestaurants')) || [];
  previousRestaurants.push(restaurant);
  localStorage.setItem('previousRestaurants', JSON.stringify(previousRestaurants));

  displayPreviousRestaurants();
}

function displayPreviousRestaurants() {
  let previousRestaurants = JSON.parse(localStorage.getItem('previousRestaurants')) || [];

  let previousRestaurantsList = document.getElementById('previousRestaurantsList');
  previousRestaurantsList.innerHTML = '';

  previousRestaurants.forEach(function (restaurant, index) {
      let restaurantInfo = document.createElement('div');
      restaurantInfo.innerHTML = `
          <h3>Restaurant ${index + 1}:</h3>
          <p>Name: ${restaurant.name}</p>
          <p>Address: ${restaurant.vicinity}</p>
      `;
      previousRestaurantsList.appendChild(restaurantInfo);
  });
}



function clearPreviousRestaurants() {
  localStorage.removeItem('previousRestaurants');
  displayPreviousRestaurants();
}

document.addEventListener("DOMContentLoaded", function () {
  displayPreviousRestaurants();
  initMap();initAutocomplete();
});

const apiKey = 'AIzaSyBHeBzhIMst_moJaXl-g23xT55gjJ3_LiY';

function initAutocomplete() {
  console.log(initAutocomplete)
  const input = document.getElementById('autocomplete');
  const autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });

  autocomplete.addListener('place_changed', function() {
    console.log('Place changed event triggered');
      const place = autocomplete.getPlace();
      if (!place.geometry) {
          console.error('Place does not have geometry');
          return;
      }

      map.setCenter(place.geometry.location);
      marker.setPosition(place.geometry.location);
      circle.setCenter(place.geometry.location);
      
  });
}
