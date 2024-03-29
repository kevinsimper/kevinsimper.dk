const fs = require('fs')
const prompts = require('prompts')
const { execSync } = require('child_process')
const { open } = require('./help/index')

const postFolder = './app/blog/posts/'
const dataFile = './app/blog/posts/_data.json'

function getPosts() {
  return JSON.parse(fs.readFileSync(dataFile))
}
exports.getPosts = getPosts
function savePosts(posts) {
  return fs.writeFileSync(dataFile, JSON.stringify(posts, null, 2))
}

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
    tags: [],
  }
}

async function main() {
  const { title } = await prompts({
    type: 'text',
    name: 'title',
    message: 'Title',
  })

  if (!title) {
    return false
  }

  let posts = getPosts()
  const post = newPost({ title })
  posts.unshift(post)
  savePosts(posts)

  const outputMd = postFolder + post.slug + '.md'
  fs.writeFileSync(outputMd, `# ${post.title}`)

  console.log('New Post')
  console.log('Title:', post.title)
  console.log('Slug:', post.slug)
  console.log(outputMd)

  execSync('npm run fix-lint')

  open(post)
}

if (require.main === module) main()
