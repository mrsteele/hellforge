import Property from 'classes/Property'

const properties: Property[] = [{
  id: 'test',
  label: '_% Better Chance of Getting Magic Items',
  min: 1,
  max: 255
}, {
  id: 'test2',
  label: '+_ To All Skills',
  min: 1,
  max: 7
}]

export default function handler(req, res) {
  res.status(200).json(properties)
}
