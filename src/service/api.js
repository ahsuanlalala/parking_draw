import axios from 'axios'

export default () => {
    let createData = {}

    createData = {
        baseURL: ' http://127.0.0.1:33333'
    }
        
    return axios.create(createData)
}