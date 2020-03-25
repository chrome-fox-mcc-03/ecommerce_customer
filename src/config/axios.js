import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ancient-reef-30300.herokuapp.com/'
})

export default instance
