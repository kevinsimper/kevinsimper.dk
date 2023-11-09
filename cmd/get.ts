import { getXataClient } from '../src/xata'

const xata = getXataClient()
async function main() {
  const page = await xata.db.mountains.getAll()

  console.log(page)
}

const climbs = [
  {
    name: "Alpe d'Heuz",
    country: 'France',
    end: '45.0946915,6.0708381',
    start: '45.065250, 6.040131',
    length: 13000,
  },
  {
    name: 'Munkebjerg',
    country: 'Denmark',
    end: '55.6858073,9.6172224',
    start: '55.692863, 9.615131',
  },
  {
    name: 'Mont Ventoux',
    country: 'France',
    end: '44.174084,5.269925',
    start: '44.123232, 5.180506',
    length: 22000,
  },
  {
    name: 'Sa Calobra',
    country: 'Mallorca',
    end: '39.816088,2.823908',
    start: '39.851002,2.799172',
  },
  {
    name: 'Col du Galibier',
    country: 'France',
    end: '45.064061,6.407863',
    start: '45.163654, 6.422708',
  },
  {
    name: 'Udsigten',
    country: 'Denmark',
    end: '55.370845,11.328069',
    start: '55.363676,11.314370',
  },
  {
    name: 'Brocken',
    country: 'Germany',
    end: '51.799100,10.615623',
    start: '51.772229, 10.647465',
  },
]

async function create() {
  for (const m of climbs.slice(1)) {
    await xata.db.mountains.create({
      name: m.name,
      country: m.country,
      startLat: Number(m.start.split(',')[0]),
      startLon: Number(m.start.split(',')[1]),
      endLat: Number(m.end.split(',')[0]),
      endLon: Number(m.end.split(',')[0]),
      length: m.length || 0,
    })
  }
}

const command = process.argv[2]
if (command === 'create') {
  create()
}
main()
