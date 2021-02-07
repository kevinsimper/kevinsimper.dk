import { MapSimple } from '../components/MapSimple'

function MapPage({ GOOGLE_MAPS_PK, time }) {
  return (
    <div className="map" style={{ minHeight: '50vh' }}>
      <div>
        {GOOGLE_MAPS_PK} {time}
      </div>
      <style>
        {`html, body, #root, .map {
      height: 100%
    }`}
      </style>
      <div className="flex" style={{ minHeight: '50vh', height: '100%' }}>
        <MapSimple
          apiKey={GOOGLE_MAPS_PK}
          focusCenter={{ lat: 55.6832338, lon: 12.5819998 }}
          centerChanged={() => console.log('centerChanged')}
          onMapReady={(map) => {
            const marker = new google.maps.Marker({
              position: { lat: 55.6832338, lng: 12.5819998 },
              map: map,
            })
          }}
        />
      </div>
    </div>
  )
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
