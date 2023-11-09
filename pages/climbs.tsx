import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { getXataClient } from '../src/xata'
import Link from 'next/link'

function ClimbsPage({
  mountains,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="space-y-4">
      <Head>
        <title>Climbs - Kevin Simper</title>
        <link rel="canonical" href={`https://www.kevinsimper.dk/climbs`} />
      </Head>
      <div>
        <h1 className="text-2xl">Climbs</h1>
        <p>Climbs that I have done on bike that I really liked</p>
      </div>
      <div className="grid gap-3">
        {mountains.map((climb) => {
          return (
            <div className="border p-4">
              <a
                href={`https://www.google.com/maps/place/${climb.endLat},${climb.endLon}`}
                className="block"
                target={'_blank'}
              >
                {climb.name} - {climb.country}
              </a>
              <a
                href={`https://www.google.com/maps/dir/${climb.startLat},${climb.startLon}/${climb.endLat},${climb.endLon}`}
                className="block"
                target={'_blank'}
              >
                See route
              </a>
              <Link
                href={`/climbs/` + climb.id}
                className="block"
                target={'_blank'}
              >
                Details
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const xata = getXataClient()
  const page = await xata.db.mountains.getAll()
  return {
    props: {
      mountains: page.map((p) => {
        let { xata, ...all } = p
        return all
      }),
    },
  }
}

export default ClimbsPage
