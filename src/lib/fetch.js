const request = async (path) => {
  const hostname = process.env.VERCEL_URL
  const file = await fetch(`https://${hostname}${path}`).then(res => res.json())
  return file
}

export default request
