import React from 'react'

function ClimbsPage() {
  return (
    <div>
      <h1 className="text-2xl">Climbs</h1>
      <p>Climbs that I have done on bike that I really liked</p>
      <div>
        {[
          {
            name: "Alpe d'Heuz",
            country: 'France',
            position: '45.0946915,6.0708381',
          },
          {
            name: 'Munkebjerg',
            country: 'Denmark',
            position: '55.6858073,9.6172224',
          },
          {
            name: 'Mont Ventoux',
            country: 'France',
            position: '44.1740843,5.2699249',
          },
          {
            name: 'Sa Calobra',
            country: 'Mallorca',
            position: '39.849081,2.7971858',
          },
          {
            name: 'Col du Galibier',
            country: 'France',
            position: '45.0640978,6.398976',
          },
          {
            name: 'Udsigten',
            country: 'Denmark',
            position: '55.363653,11.3131511',
          },
          {
            name: 'Brocken',
            country: 'Germany',
            position: '51.7994226,10.6064637',
          },
        ].map((climb) => {
          return (
            <div>
              <a href={`https://www.google.com/maps/place/${climb.position}`}>
                {climb.name} - {climb.country}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ClimbsPage
