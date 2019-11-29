const fs = require('fs')
const { execSync } = require('child_process')

const postFolder = './app/blog/posts/'
const dataFile = './app/blog/posts/_data.json'

function newPost({ title }) {
  const slug = title
    .toLowerCase()
    .replace(/-/g, '')
    .replace(/  /g, ' ')
    .replace(/ /g, '-')
    .replace(/( |\?|!|,)/g, '')

  return {
    slug,
    title,
    date: new Date().toString(),
    tags: []
  }
}

function main() {
  let posts = JSON.parse(fs.readFileSync(dataFile))
  const post = newPost({ title: process.argv[2] })
  posts.unshift(post)
  fs.writeFileSync(dataFile, JSON.stringify(posts, null, 2))

  const outputMd = postFolder + post.slug + '.md'
  fs.writeFileSync(outputMd, `# ${post.title}`)

  console.log('New Post')
  console.log('Title:', post.title)
  console.log('Slug:', post.slug)
  console.log(output)

  execSync('npm run fix-lint')
}

main()
