module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/us-covid-map/'
    : '/'
}