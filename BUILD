genrule(
  name = "build",
  srcs = glob([
    "app/**",
    "BUILD",
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
  cmd = "tar -czh . | docker build -t kevinsimper.dk - > $@",
  outs = ["build.txt"],
  tags = ["local"]
)
