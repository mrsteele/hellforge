import fs from 'fs/promises'
import path from 'path'


export default async function handler(req, res) {
  // const files = await fs.readdir(path.resolve(__dirname, '../../../../'))
  res.status(200).json({ __dirname })
}
