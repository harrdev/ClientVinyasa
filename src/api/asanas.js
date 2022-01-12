import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAsanas = (res) => {
    return axios({
        method: 'GET',
        url: 'http://localhost:8000/profile'
    })
        .then(console.log("db api route hit from client"))
        .then(res => {
            console.log('getAsanas api call to server called')
            return res
        })
        .catch((error) => console.log(error))
}