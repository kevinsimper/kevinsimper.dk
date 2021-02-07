import React from 'react'
import { MapSimple } from './MapSimple'

export default {
  title: 'MapSimple',
}

const APIKEY = ''

export const defaultComponent = () => {
  if (APIKEY.length === 0) {
    return <div>Missing API KEY, specify in component</div>
  }
  return (
    <div className="map flex">
      <style>
        {`html, body, #root, .map {
        height: 100%
      }`}
      </style>
      <MapSimple
        apiKey={APIKEY}
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

export const polygon = () => {
  if (APIKEY.length === 0) {
    return <div>Missing API KEY, specify in component</div>
  }
  return (
    <div className="map flex">
      <style>
        {`html, body, #root, .map {
        height: 100%
      }`}
      </style>
      <MapSimple
        apiKey={APIKEY}
        focusCenter={{ lat: 55.683046293821754, lon: 12.585990927014157 }}
        centerChanged={() => console.log('centerChanged')}
        mapOptions={{ zoom: 17 }}
        onMapReady={(map) => {
          const triangleCoords = [
            { lat: 55.68300887527459, lng: 12.585273385047913 },
            { lat: 55.68292268253439, lng: 12.585179507732391 },
            { lat: 55.682782051866255, lng: 12.585718631744385 },
            { lat: 55.682874293544344, lng: 12.585799098014832 },
            { lat: 55.68300887527459, lng: 12.585273385047913 },
          ]

          const cphOffice = new google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
          })
          cphOffice.setMap(map)
        }}
      />
    </div>
  )
}
