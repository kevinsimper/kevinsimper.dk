import Head from 'next/head'
import { MapSimple } from '../components/MapSimple'

export const places = {
  southamerica: {
    color: '#FF0000',
    cords: [
      {
        name: 'copenhagen',
        location: {
          lat: 55.6760968,
          lng: 12.5683371,
        },
      },
      {
        name: 'Fort Lauderdale',
        location: {
          lat: 26.1224386,
          lng: -80.1373174,
        },
      },
      {
        name: 'keywest',
        location: {
          lat: 24.5550593,
          lng: -81.77998709999997,
        },
      },
      {
        name: 'disneyland florida',
        location: {
          lat: 28.419185,
          lng: -81.58211899999998,
        },
      },
      {
        name: 'Fort Lauderdale',
        location: {
          lat: 26.1224386,
          lng: -80.1373174,
        },
      },
      {
        name: 'Quito',
        location: {
          lat: -0.1806532,
          lng: -78.46783820000002,
        },
      },
      {
        name: 'latacunga',
        location: {
          lat: -0.7754954,
          lng: -78.52064999999999,
        },
      },
      {
        name: 'baños ecuador',
        location: {
          lat: -1.3928344,
          lng: -78.4268758,
        },
      },
      {
        name: 'riobamba',
        location: {
          lat: -1.6635508,
          lng: -78.65464600000001,
        },
      },
      {
        name: 'alausi',
        location: {
          lat: -2.198607,
          lng: -78.8467579,
        },
      },
      {
        name: 'Cuenca',
        location: {
          lat: -2.9001285,
          lng: -79.0058965,
        },
      },
      {
        name: 'Guayaquil',
        location: {
          lat: -2.1709979,
          lng: -79.92235920000002,
        },
      },
      {
        name: 'Galapagos',
        location: {
          lat: -0.6518973,
          lng: -90.40563379999998,
        },
      },
      {
        name: 'Guayaquil',
        location: {
          lat: -2.1709979,
          lng: -79.92235920000002,
        },
      },
      {
        name: 'Mancora',
        location: {
          lat: -4.1034782,
          lng: -81.0451037,
        },
      },
      {
        name: 'Trujillo',
        location: {
          lat: -8.1090524,
          lng: -79.0215336,
        },
      },
      {
        name: 'Lima',
        location: {
          lat: -12.046374,
          lng: -77.0427934,
        },
      },
      {
        name: 'Cusco',
        location: {
          lat: -13.53195,
          lng: -71.96746259999998,
        },
      },
      {
        name: 'Machu Picchu Peru',
        location: {
          lat: -13.1631412,
          lng: -72.54496289999997,
        },
      },
      {
        name: 'Cusco',
        location: {
          lat: -13.53195,
          lng: -71.96746259999998,
        },
      },
      {
        name: 'Puno',
        location: {
          lat: -15.8402218,
          lng: -70.02188050000001,
        },
      },
      {
        name: 'Arequipa',
        location: {
          lat: -16.4090474,
          lng: -71.53745099999998,
        },
      },
      {
        name: 'Chivay Peru',
        location: {
          lat: -15.6393489,
          lng: -71.5990999,
        },
      },
      {
        name: 'Arequipa',
        location: {
          lat: -16.4090474,
          lng: -71.53745099999998,
        },
      },
      {
        name: 'Ica Peru',
        location: {
          lat: -13.9379378,
          lng: -75.8007093,
        },
      },
      {
        name: 'Lima',
        location: {
          lat: -12.046374,
          lng: -77.0427934,
        },
      },
      {
        name: 'Copenhagen',
        location: {
          lat: 55.6760968,
          lng: 12.5683371,
        },
      },
    ],
  },
  mallorca: {
    color: '#0074D9',
    cords: [
      {
        name: 'copenhagen',
        location: {
          lat: 55.6760968,
          lng: 12.5683371,
        },
      },
      {
        name: 'mallorca',
        location: {
          lat: 39.5699474,
          lng: 2.6457357,
        },
      },
    ],
  },
  lisbon: {
    color: '#FF851B',
    cords: [
      {
        name: 'copenhagen',
        location: {
          lat: 55.6760968,
          lng: 12.5683371,
        },
      },
      {
        name: 'lisbon',
        location: {
          lat: 38.7436057,
          lng: -9.2302432,
        },
      },
    ],
  },
  cypern: {
    color: '#85144b',
    cords: [
      {
        name: 'copenhagen',
        location: {
          lat: 55.6760968,
          lng: 12.5683371,
        },
      },
      {
        name: 'mallorca',
        location: {
          lat: 34.9993373,
          lng: 33.9329035,
        },
      },
    ],
  },
  sf: {
    color: '#111111',
    cords: [
      {
        name: 'copenhagen',
        location: {
          lat: 55.6760968,
          lng: 12.5683371,
        },
      },
      {
        name: 'sf',
        location: {
          lat: 37.7576948,
          lng: -122.4726194,
        },
      },
    ],
  },
  kiev: {
    color: '#001f3f',
    cords: [
      {
        name: 'copenhagen',
        location: {
          lat: 55.6760968,
          lng: 12.5683371,
        },
      },
      {
        name: 'kiev',
        location: {
          lat: 50.4019514,
          lng: 30.3926091,
        },
      },
    ],
  },
  newdelhi: {
    color: '#079e00',
    cords: [
      {
        name: 'copenhagen',
        location: {
          lat: 55.6760968,
          lng: 12.5683371,
        },
      },
      {
        name: 'kiev',
        location: {
          lat: 28.5272181,
          lng: 77.0688997,
        },
      },
    ],
  },
}

function MapPage({ GOOGLE_MAPS_PK, time }) {
  return (
    <div className="map" style={{ minHeight: 'calc(100vh - 158px)' }}>
      <Head>
        <title>Map</title>
        <link rel="canonical" href={`https://www.kevinsimper.dk/map`} />
      </Head>
      <style>
        {`html, body, #root, .map {
      height: 100%
    }`}
      </style>
      <div
        className="flex"
        style={{ minHeight: 'calc(100vh - 158px)', height: '100%' }}
      >
        <MapSimple
          apiKey={GOOGLE_MAPS_PK}
          focusCenter={{ lat: 55.6832338, lon: 12.5819998 }}
          centerChanged={() => console.log('centerChanged')}
          onMapReady={(map) => {
            let bounds = new google.maps.LatLngBounds()
            // remove the first location as it is copenhagen

            Object.keys(places).forEach((key) => {
              var place = places[key]
              place.cords.slice(1, place.cords.length).map((place) => {
                var marker = new google.maps.Marker({
                  map: map,
                  position: place.location,
                  icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0',
                })
                // @ts-ignore
                bounds.extend(marker.getPosition())
              })
              map.fitBounds(bounds)
              var flightPlanCoordinates = place.cords.map(
                (place) => place.location
              )
              var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: place.color,
                strokeOpacity: 1.0,
                strokeWeight: 2,
              })
              flightPath.setMap(map)
            })
          }}
        />
      </div>
    </div>
  )
}

MapPage.pageStyle = {
  fullWidth: true,
}

export async function getServerSideProps(context) {
  return {
    props: {
      GOOGLE_MAPS_PK: process.env.GOOGLE_MAPS_PK,
      time: Date.now(),
    },
  }
}

export default MapPage
