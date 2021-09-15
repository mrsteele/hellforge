import apiGetCharacters from 'pages/api/v2/characters/[[...slug]]'

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