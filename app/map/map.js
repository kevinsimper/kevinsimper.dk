var places = require('./coordinates')

window.initMap = function() {
  var map = new google.maps.Map(document.getElementById('app'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  })

  let bounds = new google.maps.LatLngBounds()
  // remove the first location as it is copenhagen

  Object.keys(places).forEach(key => {
    var place = places[key]
    place.cords.slice(1, place.cords.length).map(place => {
      var marker = new google.maps.Marker({
        map: map,
        position: place.location,
        icon:
          'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0'
      })
      bounds.extend(marker.getPosition())
    })
    map.fitBounds(bounds)
    var flightPlanCoordinates = place.cords.map(place => place.location)
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: place.color,
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
    flightPath.setMap(map)
  })

  // var geocoder = new google.maps.Geocoder()
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
