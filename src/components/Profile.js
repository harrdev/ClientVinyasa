import { Link } from 'react-router-dom'
import { deleteRoutine, editRoutine } from '../api/routine'
import { getRoutine } from '../api/routine'
import { useEffect, useState } from 'react'

const Profile = (props) => {
    const { user } = props
    const [userRoutines, setUserRoutines] = useState([])
    const [dummyArray, setDummyArray] = useState('0')

    //********************** API call to userRoutines DB for saved routines ***************************/
	const getUserPoses = () => {
		getRoutine(user)
			.then(res => {
				res = Object.values(res.data.routine)
				setUserRoutines(res)
			})
            .then (res=> {
                stateUpdate()
            })
            .catch(error => {
                console.log("error resolving")
            })
	}

    useEffect (() => {
        getUserPoses()
    }, [])
    // const preview = () => {
    //     for (let i = 0; i < 9; i++) {
    //         console.log(userRoutines[0].routine[i].imageUrl)
    //         return userRoutines[0].routine[i].imageUrl
    //     }
    // }

    //****************** Handler to delete a saved practice *********************/
    const handleDelete = (r) => {
        deleteRoutine(r._id, user)
        getUserPoses()
            // .then(res => {
            //     console.log(res)
            //     getRoutine(user)
            // })
    }

    const stateUpdate = () => {
        setDummyArray('1')
    }

    //****************** Handler to edit a saved practice name *******************/
    const handleEdit = (r) => {
        editRoutine()
    }

    //******************* Loop to display all saved routines *********************/
    const usersRoutines = userRoutines.map((r, i) => {
        // console.log("image??: ", r.routine[0].imageUrl)
        return (
            <li key={i}>
                <div>
                    <div>
                        {r.name}
                        <img className="profilePic" src={r.routine[0].imageUrl}></img>
                    </div>
                    <div>
                        <button>Start Routine</button>
                        <button>Edit</button>
                        <button onClick={() => handleDelete(r)}>Delete</button>
                    </div>
                </div>
            </li>
        )
    })

    return (
        <>
            <div className="userRoutines">
                <h2>Profile Page</h2>
                <ul>
                    {usersRoutines}
                </ul>
            </div>
        </>
    )
}

export default Profile