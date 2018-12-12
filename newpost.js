const fs = require('fs')

const postFolder = './app/blog/posts/'
const title = process.argv[2]
const slug = title.toLowerCase().replace(/ /g, '-')
const file = './app/blog/posts/_data.json'

console.log('New Post')
console.log('Title:', title)
console.log('Slug:', slug)
console.log(postFolder + slug)

let posts = JSON.parse(fs.readFileSync(file))

posts.unshift({
  slug,
  title,
  date: new Date().toString(),
  tags: []
})

fs.writeFileSync(file, JSON.stringify(posts, null, 2))

fs.writeFileSync(postFolder + slug + '.md', `# ${title}`)
