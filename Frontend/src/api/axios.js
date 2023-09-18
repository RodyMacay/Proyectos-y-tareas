import axios from 'axios'

const axio = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true
})

export default axio