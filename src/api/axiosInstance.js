import Axios from 'axios'

const Instance = Axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://polar-mesa-44414.herokuapp.com',
  timeout: 60000
})

export default Instance
