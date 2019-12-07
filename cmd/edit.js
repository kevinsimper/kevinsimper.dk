const prompts = require('prompts')
const { getPosts } = require('./newpost')
const { execSync } = require('child_process')

function open(post) {
  execSync(`open -a "Typora" ./app/blog/posts/${post.slug}.md`)
}

const main = async () => {
  const posts = getPosts()
  const response = await prompts({
    type: 'autocomplete',
    name: 'value',
    message: 'Edit post',
    choices: posts,
    limit: 16
  })
  if (response.value === undefined) {
    console.log('No blogpost selected!')
    process.exit(0)
  }
  const post = posts.find(p => p.title === response.value)
  open(post)
}

main()
