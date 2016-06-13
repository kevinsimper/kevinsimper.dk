var map;
window.initMap = function () {
  var geocoder = new google.maps.Geocoder()
  map = new google.maps.Map(document.getElementById('app'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  })

  var places = [
    {
      "name": "copenhagen",
      "location": {
        "lat": 55.6760968,
        "lng": 12.568337100000008
      }
    },
    {
      name: 'Fort Lauderdale',
      location: {
        "lat": 26.1224386,
        "lng": -80.13731740000003
      }
    },
    {
      "name": "keywest",
      "location": {
        "lat": 24.5550593,
        "lng": -81.77998709999997
      }
    },
    {
      "name": "disneyland florida",
      "location": {
        "lat": 28.419185,
        "lng": -81.58211899999998
      }
    },
    {
      name: 'Fort Lauderdale',
      location: {
        "lat": 26.1224386,
        "lng": -80.13731740000003
      }
    },
    {
      name: 'Quito',
      location: {
        "lat": -0.1806532,
        "lng": -78.46783820000002
      }
    },
    {
      "name": "latacunga",
      "location": {
        "lat": -0.7754954,
        "lng": -78.52064999999999
      }
    },
    {
      "name": "baños ecuador",
      "location": {
        "lat": -1.3928344,
        "lng": -78.4268758
      }
    },
    {
      "name": "riobamba",
      "location": {
        "lat": -1.6635508,
        "lng": -78.65464600000001
      }
    },
    {
      "name": "alausi",
      "location": {
        "lat": -2.198607,
        "lng": -78.8467579
      }
    },
    {
      name: 'Cuenca',
      location: {
        "lat": -2.9001285,
        "lng": -79.0058965
      }
    },
    {
      name: 'Guayaquil',
      location: {
        "lat": -2.1709979,
        "lng": -79.92235920000002
      }
    },
    {
      name: 'Galapagos',
      location: {
        "lat": -0.6518973,
        "lng": -90.40563379999998
      }
    },
    {
      name: 'Guayaquil',
      location: {
        "lat": -2.1709979,
        "lng": -79.92235920000002
      }
    },
    {
      "name": "Mancora",
      "location": {
        "lat": -4.1034782,
        "lng": -81.04510370000003
      }
    },
    {
      "name": "Trujillo",
      "location": {
        "lat": -8.1090524,
        "lng": -79.0215336
      }
    },
    {
      "name": "Lima",
      "location": {
        "lat": -12.046374,
        "lng": -77.0427934
      }
    },
    {
      "name": "Cusco",
      "location": {
        "lat": -13.53195,
        "lng": -71.96746259999998
      }
    },
    {
      "name": "Machu Picchu Peru",
      "location": {
        "lat": -13.1631412,
        "lng": -72.54496289999997
      }
    },
    {
      "name": "Cusco",
      "location": {
        "lat": -13.53195,
        "lng": -71.96746259999998
      }
    },
    {
      "name": "Puno",
      "location": {
        "lat": -15.8402218,
        "lng": -70.02188050000001
      }
    },
    {
      "name": "Arequipa",
      "location": {
        "lat": -16.4090474,
        "lng": -71.53745099999998
      }
    },
    {
      "name": "Chivay Peru",
      "location": {
        "lat": -15.6393489,
        "lng": -71.5990999
      }
    },
    {
      "name": "Arequipa",
      "location": {
        "lat": -16.4090474,
        "lng": -71.53745099999998
      }
    },
    {
      "name": "Ica Peru",
      "location": {
        "lat": -13.9379378,
        "lng": -75.8007093
      }
    },
    {
      "name": "Lima",
      "location": {
        "lat": -12.046374,
        "lng": -77.0427934
      }
    }
  ]

  let bounds = new google.maps.LatLngBounds()
  // remove the first location as it is copenhagen
  places.slice(1, places.length).map((place) => {
    var marker = new google.maps.Marker({
        map: map,
        position: place.location,
        icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0'
    })
    bounds.extend(marker.getPosition())
  })
  map.fitBounds(bounds)

  var flightPlanCoordinates = places.map(place => place.location)
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);

  // let name = 'latagunga'
  // geocoder.geocode( { 'address': name}, function(results, status) {
  //   if (status === google.maps.GeocoderStatus.OK) {
  //     console.log(JSON.stringify({
  //       name: name,
  //       location: results[0].geometry.location,
  //     }, null, 2))
  //     // map.setCenter(results[0].geometry.location)
  //     var marker = new google.maps.Marker({
  //         map: map,
  //         position: results[0].geometry.location
  //     })
  //   } else {
  //     alert("Geocode was not successful for the following reason: " + status)
  //   }
  // })
}
