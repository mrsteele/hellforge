module.exports = {
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