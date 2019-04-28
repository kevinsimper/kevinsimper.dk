const fs = require('fs')
const { execSync } = require('child_process')

const postFolder = './app/blog/posts/'
const title = process.argv[2]
const slug = title
  .toLowerCase()
  .replace(/-/g, '')
  .replace(/  /g, ' ')
  .replace(/ /g, '-')
  .replace(/( |\?|!|,)/g, '')
const file = './app/blog/posts/_data.json'
const output = postFolder + slug + '.md'

console.log('New Post')
console.log('Title:', title)
console.log('Slug:', slug)
console.log(output)

let posts = JSON.parse(fs.readFileSync(file))

posts.unshift({
  slug,
  title,
  date: new Date().toString(),
  tags: []
})

fs.writeFileSync(file, JSON.stringify(posts, null, 2))

fs.writeFileSync(output, `# ${title}`)

execSync('npm run fix-lint')
