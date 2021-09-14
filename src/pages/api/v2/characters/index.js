import fetch from 'lib/fetch'

const ids = {
  Amazon: 'ama',
  Barbarian: 'bar',
  Necromancer: 'nec',
  Paladin: 'pal',
  Sorceress: 'sor',
  Assassin: 'ass',
  Druid: 'dru',
  Expansion: 'na'
}

const transform = (i) => ({
  id: ids[i.class],
  name: i.class,
  stats: {
    str: parseInt(i.str),
    dex: parseInt(i.dex),
    int: parseInt(i.int),
    vit: parseInt(i.vit)
  },
  stamina: parseInt(i.stamina)
  // TODO: FINISH!
})

export default async function handler(req, res) {
  // all items
  const data = await fetch(`/api/v1/charstats`)

  res.status(200).json(data.map(transform))
}
