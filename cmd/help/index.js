const { execSync } = require('child_process')

exports.open = function open(post) {
  execSync(`open -a "Typora" ./app/blog/posts/${post.slug}.md`)
}
