const prompts = require('prompts')
const { getPosts } = require('./newpost')
const { open } = require('./help/index')

const main = async () => {
  const posts = getPosts()
  const response = await prompts({
    type: 'autocomplete',
    name: 'value',
    message: 'Edit post',
    choices: posts.map((p) => ({
      title: new Date(p.date).toISOString().split('T')[0] + ' ' + p.title,
      value: p.title,
    })),
    limit: 20,
  })
  if (response.value === undefined) {
    console.log('No blogpost selected!')
    process.exit(0)
  }
  const post = posts.find((p) => p.title === response.value)
  open(post)
}

main()
