import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { getXataClient } from '../../src/xata'

function ClimbsPage({
  mountain,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div className="space-y-4">{mountain.name}</div>
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
    },
  }
}

export default ClimbsPage
