const data = {};

function importAll(r) {
  r.keys().forEach((key) => {
    if (key[0] !== '.') {
      return
    }
    const newKey = key.split('.')[1].substr(1).toLowerCase()
    data[newKey] = r(key).default
  })
}

importAll(require.context('../d2files', false, /\.txt$/))

export default data
