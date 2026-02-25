import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:5000',
    
    // baseURL: 'https://careonimal.onrender.com'
})