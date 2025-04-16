// pages/api/llm/blogposts.js

import { readFileSync } from 'fs'

export default async function handler(req, res) {
  // Check for authentication
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
    res.status(401).json({ error: 'Authentication required' })
    return
  }

  // my username and password
  const username = 'admin'
  const passwordMd5 = '888b9f113180fa7333ab8686d085b946'

  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':')
  const inputUsername = credentials[0]
  const inputPassword = credentials[1]

  if (
    inputUsername !== username ||
    require('crypto').createHash('md5').update(inputPassword).digest('hex') !==
      passwordMd5
  ) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  try {
    const path = process.cwd() + '/app/blog/posts/'
    const data = JSON.parse(readFileSync(path + '_data.json', 'utf8'))

    // Format the blog posts as XML
    let xmlResponse = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xmlResponse += '<blogposts>\n'

    data.forEach((post) => {
      xmlResponse += '  <post>\n'
      xmlResponse += `    <slug>${post.slug}</slug>\n`
      xmlResponse += `    <title>${escapeXml(post.title)}</title>\n`
      xmlResponse += `    <date>${post.date}</date>\n`

      if (post.tags && post.tags.length > 0) {
        xmlResponse += '    <tags>\n'
        post.tags.forEach((tag) => {
          xmlResponse += `      <tag>${escapeXml(tag)}</tag>\n`
        })
        xmlResponse += '    </tags>\n'
      }

      // Get a preview of the content (first 150 chars)
      try {
        const content = readFileSync(path + '/' + post.slug + '.md', 'utf8')
        xmlResponse += `    <preview>${escapeXml(content)}</preview>\n`
      } catch (error) {
        xmlResponse += '    <preview>Content not available</preview>\n'
      }

      xmlResponse += '  </post>\n'
    })

    xmlResponse += '</blogposts>'

    // Set the appropriate Content-Type header
    res.setHeader('Content-Type', 'application/xml')
    res.status(200).send(xmlResponse)
  } catch (error) {
    // Error response in XML format
    const errorResponse = `<?xml version="1.0" encoding="UTF-8"?>\n<error>\n  <message>${escapeXml(
      error.message
    )}</message>\n</error>`

    res.setHeader('Content-Type', 'application/xml')
    res.status(500).send(errorResponse)
  }
}

// Helper function for escaping XML special characters
function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
