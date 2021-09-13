import fs from 'fs/promises'
import path from 'path'
// import raw from 'src/test'
import { uniqueitems } from 'transforms/uniqueitems'


export default async function handler(req, res) {
  // __dirname = /var/task/.next/server/pages/api/v2
  const files = await fs.readdir(path.resolve(__dirname, '../../../../public'))
  res.status(200).json({ __dirname, files })
}
