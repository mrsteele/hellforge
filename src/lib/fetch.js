const request = async (path) => {
  const hostname = process.env.VERCEL_URL
  const file = await fetch(`http://${hostname}${path}`).then(res => res.json())
  return file
}

export const graphql = async (path, query) => {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
}

export default request
