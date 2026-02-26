import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'volunteerteach-production.up.railway.app'
    
})