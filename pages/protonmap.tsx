import { useState } from 'react'
import Script from 'next/script'
import { places } from './map'

function MapPage({ PROTONMAPS, time }) {
  const [leafLoaded, setLeafLoaded] = useState(false)
  return (
    <div className="mapcontainer" style={{ minHeight: 'calc(100vh - 158px)' }}>
      <style>
        {`
          html, body, #root, .mapcontainer {
            height: 100%
          }
        `}
      </style>
      <div
        id="map"
        className="flex"
        style={{ minHeight: 'calc(100vh - 158px)', height: '100%' }}
      ></div>

      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      />
      <Script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        onLoad={() => {
          console.log('leaf')
          setLeafLoaded(true)
        }}
      />
      {leafLoaded && (
        <>
          <Script
            src="https://unpkg.com/leaflet.geodesic@2.6.1/dist/leaflet.geodesic.umd.min.js"
            onLoad={() => {
              console.log('geodesic')
            }}
          />
          <Script
            src="https://unpkg.com/protomaps@latest/dist/protomaps.min.js"
            onLoad={() => {
              console.log('protonmaps')
              let URL =
                'https://api.protomaps.com/tiles/v2/{z}/{x}/{y}.pbf?key=' +
                PROTONMAPS
              // @ts-ignore
              const leaf: any = L
              // @ts-ignore
              window.lk = L

              let map = leaf.map('map')
              map.setView([55, 12], 2)

              // @ts-ignore
              protomaps
                .leafletLayer({
                  url: URL,
                })
                .addTo(map)

              var myIcon = leaf.icon({
                iconUrl:
                  'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0',
                iconSize: [9, 9],
              })

              const bounds = leaf.latLngBounds()
              Object.keys(places).forEach((key) => {
                var place = places[key]
                place.cords.slice(1, place.cords.length).map((cord) => {
                  leaf
                    .marker([cord.location.lat, cord.location.lng], {
                      title: cord.name,
                      icon: myIcon,
                    })
                    .addTo(map)
                  bounds.extend([cord.location.lat, cord.location.lng])
                })
                var flightPlanCoordinates = place.cords.map((place) => [
                  place.location.lat,
                  place.location.lng,
                ])
                var flightPath = leaf.geodesic(flightPlanCoordinates, {
                  color: place.color,
                })
                flightPath.addTo(map)
              })
              // for some reason map.fitBounds(bounds) does not work
              map.fitBounds([bounds.getNorthEast(), bounds.getSouthWest()])
            }}
          />
        </>
      )}
    </div>
  )
}

MapPage.pageStyle = {
  fullWidth: true,
}

export async function getServerSideProps(context) {
  return {
    props: {
      PROTONMAPS: 'd916a41e61be6e67',
      time: Date.now(),
    },
  }
}

export default MapPage
