import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://api.github.com`,
    withCredentials: false,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  })
}
