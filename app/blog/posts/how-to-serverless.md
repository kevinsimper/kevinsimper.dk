# How to Serverless from scratch

Links to the tool Up
https://up.docs.apex.sh/

Links to the AWS console
http://aws.amazon.com/

AWS credidentials file which should be in this location `~/.aws/credentials`:
```
[default]
aws_access_key_id = XXXXXX
aws_secret_access_key = XXXXXX
```

The up.json config file
```
{
  "name": "awesome-bear"
}
```

My app.js file
```
const http = require('http')
const PORT = process.env.PORT || 3000
http.createServer((req, res) => {
  res.end('Hi Serverless World')
}).listen(PORT)
```

How to install up:
```
curl -sf https://up.apex.sh/install | sh
```

Commands I am running
```
$ up
$ up url
$ up url -s production
```
