import { Link } from 'react-router-dom'
import { deleteRoutine, editRoutine } from '../api/routine'
import { getRoutine } from '../api/routine'
import { useEffect, useState } from 'react'
import CreateRoutine from './CreateRoutine'
import Button from 'react-bootstrap/Button'

const Profile = (props) => {
    const { user, pose } = props
    const [userRoutines, setUserRoutines] = useState([])
    const [editRoutine, setEditRoutine] = useState([])
    //********************** API call to userRoutines DB for saved routines ***************************/
    const getUserPoses = () => {
        getRoutine(user)
            .then(res => {
                res = Object.values(res.data.routine)
                setUserRoutines(res)
            })
            .catch(error => {
                console.log("error resolving")
            })
    }

    useEffect(() => {
        getUserPoses()
    }, [])

    //****************** Handler for start routine **************************/
    const handleStart = () => {

    }

    //****************** Handler to delete a saved practice *********************/
    const handleDelete = (r) => {
        deleteRoutine(r._id, user)
        getUserPoses()
    }

    //****************** Handler to edit a saved practice name *******************/
    // This is setup to pass the edited data to the CreateRoutine page
    const handleEdit = (r) => {
    }

    //******************* Loop to display all saved routines *********************/
    const usersRoutines = userRoutines.map((r, i) => {
        return (
            <li key={i}>
                <div>
                    <div>
                        {r.name}
                        <img className="profilePic" src={r.routine[0].imageUrl}></img>
                        <img className="profilePic" src={r.routine[1].imageUrl}></img>
                        <img className="profilePic" src={r.routine[2].imageUrl}></img>
                    </div>
                    <div>
                        <Link to={`/startroutine/${r._id}`}>
                            <Button variant="primary">Begin Practice</Button>
                        </Link>
                        <button onClick={() => handleEdit(r)}>Edit Name</button>
                        <button onClick={() => handleDelete(r)}>Delete</button>
                    </div>
                </div>
            </li>
        )
    })

    return (
        <>
            <div className="userRoutines">
                <h2 className="pageTitle" >My Saved Practices</h2>
                <ul>
                    {usersRoutines}
                </ul>
            </div>
        </>
    )
}

export default Profile