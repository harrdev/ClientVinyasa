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

