module.exports = {
  plugins: [
    require('precss')({
      /* ...options */
    }),
    require('autoprefixer')({
      flexbox: false
    })
  ]
}
