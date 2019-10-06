genrule(
  name = "docker",
  srcs = glob([
    "app/**",
    "dist/**",
    "Dockerfile",
    "import.js",
    "newpost.js",
    "package-lock.json",
    "package.json",
    "postcss.config.js",
    "public/**",
    "server.js",
    "webpack.client.config.js",
    "webpack.server.config.js",
    "wordpress.xml"
  ]),
  cmd = "tar -czh . | docker build -q -t kevinsimper.dk - > $@",
  outs = ["build.txt"],
  tags = ["local"]
)

genrule(
  name = "run",
  srcs = ["build.txt"],
  cmd = "echo docker run -it --rm -p 9000:9000 $$(cat $(location build.txt)) > $@",
  outs = ["run_blog.sh"],
  executable = True
)
