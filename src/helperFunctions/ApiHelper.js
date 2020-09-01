const ApiHelper = (url, method = 'GET', data = {}) => {
  const bearer = `Bearer ${process.env.NEXT_PUBLIC_GOREST_API_TOKEN}`
  let aditional
  method === 'POST' ? (aditional = { body: JSON.stringify(data) }) : (aditional = {})
  return fetch(url, {
    ...aditional,
    method: method,
    withCredentials: true,
    headers: {
      Authorization: bearer,
      'X-FP-API-KEY': 'chaptoken',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(
      result => {
        return result
      },
      error => {
        error = error
      },
    )
}

export default ApiHelper
