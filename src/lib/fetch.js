const request = async (path) => {
  const hostname = process.env.NEXT_PUBLIC_SITE_URL
  const file = await fetch(`${hostname}${path}`).then(res => res.json())
  return file
}

export default request
