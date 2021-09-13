const data = {};

function importAll(r) {
  r.keys().forEach((key) => {
    const newKey = key.split('.')[1].substr(1).toLowerCase()
    data[newKey] = r(key).default
  })
}

importAll(require.context('../d2files', false, /\.txt$/))

//console.log('files', files)
/*
files [Function: webpackContext] {
  keys: [Function: webpackContextKeys],
  resolve: [Function: webpackContextResolve],
  id: './src/d2files sync \\.txt$'
*/
// console.log('data', data[Object.keys(data)[0]])
// console.log('keys', Object.keys(data))



// export default files.keys().reduce((all, key) => {
//   all[key] = files.resolve(key)
//   return all
// }, {})

export default data
