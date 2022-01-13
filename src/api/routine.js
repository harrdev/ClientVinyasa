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
    console.log('getRoutine API call hit')
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

// ****************** API call to show saved practices ************//
export const getSelectedRoutine = (res) => {
    console.log('this is the request ID', res)
    return axios({
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${res.token}`
    },
    url: apiUrl + '/startroutine/:id'
    })
    .then(res => {
        return res
    })
    .catch((error) => console.log(error))
}
//****************** API call to delete a saved routine *****************//
export const deleteRoutine = (id, user) => {
    return axios({
        url: `${apiUrl}/profile/${id}`,
        method: 'DELETE',
        headers: {
        	Authorization: `Token token=${user.token}`,
        },
    })
}

//****************** API call to edit a saved routine *****************//
export const editRoutine = (editedName, user) => {
	return axios({
		url: `${apiUrl}/startroutine`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			editedName
		},
	})
}