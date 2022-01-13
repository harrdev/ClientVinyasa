import apiUrl from '../apiConfig'
import axios from 'axios'

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

// ****************** API call to show saved practices ************//

export const getRoutine = (res) => {
    // console.log('this is the user', user)
    return axios({
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${res.token}`
    },
    url: apiUrl + '/profile'
    })
    .then(res => {
        console.log('getRoutine client API request sent', res.data.routine)
        return res
    })
    .catch((error) => console.log(error))
}
