const filenames = [
  'Armor',
  'Books',
  'CharStats',
  'CompCode',
  'CubeMain',
  'DifficultyLevels',
  'ElemTypes',
  'Events',
  'expansionstring',
  'Experience',
  'Gems',
  'Hireling',
  'Inventory',
  'ItemRatio',
  'ItemStatCost',
  'ItemTypes',
  'Levels',
  'LvlMaze',
  'LvlPrest',
  'LvlSub',
  'LvlTypes',
  'MagicPrefix',
  'MagicSuffix',
  'merged',
  'Misc',
  'MissCalc',
  'MonAi',
  'MonEquip',
  'MonLvl',
  'MonMode'
]

const data = filenames.reduce((all, file) => {
  all[file.toLowerCase()] = require(`d2files/${file}.txt`).default
  return all
}, {})

export default data
