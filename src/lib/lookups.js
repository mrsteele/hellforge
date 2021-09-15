import apiGetColors from 'pages/api/v2/colors/[[...slug]]'
import apiGetCharacters from 'pages/api/v2/characters/[[...slug]]'

export const colorCodeTable = apiGetColors.getAll().reduce((all, color) => {
  all[color.code] === color.id
  return all
}, {})

export const charIdsFromCode = apiGetCharacters.getAll().reduce((all, char) => {
  all[char.code] = char.id
  return all
}, {})


// const charIds = {
//   ama: 'Amazon',
//   bar: 'Barbarian',
//   nec: 'Necromancer',
//   pal: 'Paladin',
//   sor: 'Sorceress',
//   ass: 'Assassin',
//   dru: 'Druid',
//   '': 'Expansion'
// }