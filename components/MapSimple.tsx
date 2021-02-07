import React, { useEffect, useRef, useState } from 'react'

type Position = { lat: number; lon: number }

function debounce(func: () => void, wait: number, immediate: boolean) {
  var timeout: null | ReturnType<typeof setTimeout>
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

type MapComponentProps = {
  apiKey: string
  focusCenter: Position | null
  centerChanged: (latLon: Position) => void
  mapOptions?: { [key: string]: any }
  onMapReady: (map: google.maps.Map<Element>) => void
}

export const MapSimple = ({
  apiKey,
  focusCenter,
  centerChanged,
  mapOptions,
  onMapReady,
}: MapComponentProps) => {
  const [mapVar, setMapVar] = useState<google.maps.Map<Element> | null>(null)
  const mapEl = useRef<HTMLDivElement>(null)
  const myStyles: any = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ]
  const _mapOptions = {
    center: {
      lat: 55.6828718,
      lng: 12.5832609,
    },
    zoom: 15,
    styles: myStyles,
    ...mapOptions,
  }

  useEffect(() => {
    const id = 'google-maps-script'
    const initMap = function () {
      const el = mapEl.current
      if (el === null) throw new Error('not an element')
      const map = new google.maps.Map(el, _mapOptions)
      setMapVar(map)
      onMapReady(map)
    }
    if (document.querySelector('#' + id) !== null) {
      // google maps already loaded
      initMap()
    } else {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
      script.async = true
      script.id = id
      window['initMap'] = initMap

      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (!mapVar) return
    if (focusCenter) {
      if (
        focusCenter.lat !== mapVar.getCenter().lat() &&
        focusCenter.lon !== mapVar.getCenter().lng()
      ) {
        mapVar.setCenter({
          lat: focusCenter.lat,
          lng: focusCenter.lon,
        })
      }
    }
  }, [mapVar, focusCenter])

  useEffect(() => {
    if (!mapVar) return
    const waitToUpdateCenter = debounce(
      function () {
        const center = mapVar.getCenter()
        centerChanged({
          lat: center.lat(),
          lon: center.lng(),
        })
      },
      200,
      false
    )
    let listener = mapVar.addListener('center_changed', waitToUpdateCenter)
    return function cleanup() {
      google.maps.event.removeListener(listener)
    }
  }, [mapVar])

  return <div style={{ flex: 1 }} ref={mapEl}></div>
}
