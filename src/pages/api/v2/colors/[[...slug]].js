import createEntryPointHandler from "lib/createEntryPoint"

const transform = (i) => ({
  code: i.Code,
  name: i['Transform Color']
})

export default createEntryPointHandler('colors', transform)


// export default async function handler(req, res) {
//   // all items
//   const data = raw.colors
//   res.status(200).json(data)

//   // res.status(200).json(data.map(transform))
// }
