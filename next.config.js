module.exports = {
  async redirects() {
    return [{
      source: '/docs/v1',
      destination: '/v1',
      permanent: true,
    }, {
      source: '/docs/v2',
      destination: '/v2',
      permanent: true
    }]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.txt$/i,
      use: 'raw-loader',
    })

    config.module.rules.push({
      test: /\.md$/i,
      use: 'raw-loader'
    })

    return config
  }
}