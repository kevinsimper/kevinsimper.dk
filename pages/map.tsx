import { MapSimple } from '../components/MapSimple'

function MapPage({ GOOGLE_MAPS_PK }) {
  return (
    <div className="map flex" style={{ minHeight: '50vh' }}>
      <style>
        {`html, body, #root, .map {
      height: 100%
    }`}
      </style>
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
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      GOOGLE_MAPS_PK: process.env.GOOGLE_MAPS_PK,
    },
  }
}

export default MapPage
