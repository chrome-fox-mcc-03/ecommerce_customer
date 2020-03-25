import axios from 'axios'

const axiosCostumer = axios.create({
  // baseURL: 'https://polar-shelf-75617.herokuapp.com/'
  baseURL: 'http://localhost:3000'
})

export default axiosCostumer
