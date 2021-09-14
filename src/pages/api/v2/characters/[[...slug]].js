import createEntryPointHandler from "lib/createEntryPoint"

const transform = (id, i) => ({
  id,
  name: i.class,
  stats: {
    str: i.str,
    dex: i.dex,
    int: i.int,
    vit: i.vit
  },
  stamina: i.stamina
  // TODO: FINISH!
})

export default createEntryPointHandler('charstats', transform)


// export default async function handler(req, res) {
//   // all items
//   const data = raw.charstats
//   res.status(200).json(data)

//   // res.status(200).json(data.map(transform))
// }
