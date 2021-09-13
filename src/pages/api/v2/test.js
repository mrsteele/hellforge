import fs from 'fs/promises'
import path from 'path'
// import raw from 'src/test'


export default async function handler(req, res) {
  // __dirname = /var/task/.next/server/pages/api/v2
  // const file = await fetch('/api/uniqueitems.json')
  const files = await fs.readdir(path.resolve(__dirname, '../../../../../public/api'))
  res.status(200).json({ __dirname, files })
}
