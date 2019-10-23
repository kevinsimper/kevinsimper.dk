import React from 'react'
import Layout from './components/Layout'
import Map from './components/Map'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

const production = process.env.NODE_ENV === 'production'
const assets = global.assets

function layout(props) {
  return `<!DOCTYPE html>
  ${renderToStaticMarkup(<Layout {...props} />)}
  `
}
function map(props) {
  return `<!DOCTYPE html>
  ${renderToStaticMarkup(<Map {...props} />)}
  `
}
export { assets, production, layout, map }
