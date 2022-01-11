import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAsanas = (res) => {
    return axios({
    method: 'GET',
    headers: {
        // "Authorization": `Bearer ${res.token}`
    },
    url: apiUrl + '/'
})
    .then(res => {
        console.log('getAsanas client API request sent', res.data.asanas)
        return res
    })
    .catch((error) => console.log(error))
}
// ****************** Post API call for saving routine ****************//
export const addRoutine = (info, user) => {
    console.log("User is: ", user)
    console.log("Info is: ", info)
    return axios({
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${user.token}`
        },
        url: apiUrl + '/createroutine',
        data: {
            info: {
                name: info.name,
                routine: info.routine
            }
        }
    })
}
