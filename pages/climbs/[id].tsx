import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { getXataClient } from '../../src/xata'
import { MapSimple } from '../../components/MapSimple'
import Link from 'next/link'

function ClimbsPage({
  mountain,
  GOOGLE_MAPS_PK,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!GOOGLE_MAPS_PK) return false
  return (
    <div className="space-y-4">
      <Link href="/climbs">← Back</Link>
      <h1 className="text-2xl">{mountain.name}</h1>
      <div>
        <a
          href={`https://www.google.com/maps/dir/${mountain.startLat},${mountain.startLon}/${mountain.endLat},${mountain.endLon}`}
          className="block text-purple underline"
          target={'_blank'}
        >
          See route on Google Maps
        </a>
      </div>
      <div>
        <div className="font-bold">Details</div>
        <div>Length: {mountain.length && mountain.length / 1000} km</div>
        <div>Country: {mountain.country}</div>
      </div>
      <div className="flex" style={{ height: 500 }}>
        <MapSimple
          apiKey={GOOGLE_MAPS_PK}
          focusCenter={{ lat: mountain.endLat || 0, lon: mountain.endLon || 0 }}
          onMapReady={(map) => {
            const marker = new google.maps.Marker({
              map: map,
              position: {
                lat: mountain.endLat || 0,
                lng: mountain.endLon || 0,
              },
              title: mountain.name || '',
            })
          }}
          centerChanged={() => {}}
          mapOptions={{
            zoom: 11,
          }}
        />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const id = context.query.id?.toString()
  if (!id) {
    return {
      notFound: true,
    }
  }
  const client = getXataClient()
  const page = await client.db.mountains.read(id)
  if (!page) {
    return {
      notFound: true,
    }
  }
  const { xata, ...mountain } = page
  return {
    props: {
      mountain: mountain,
      GOOGLE_MAPS_PK: process.env.GOOGLE_MAPS_PK,
    },
  }
}

export default ClimbsPage
