import { Link } from 'react-router-dom'
import { deleteRoutine } from '../api/routine'
import { getRoutine } from '../api/routine'

const Profile = (props) => {
    const { userRoutines, user } = props

    // const preview = () => {
    //     for (let i = 0; i < 9; i++) {
    //         console.log(userRoutines[0].routine[i].imageUrl)
    //         return userRoutines[0].routine[i].imageUrl
    //     }
    // }

    const handleDelete = (r) => {
        deleteRoutine(r._id, user)
            .then(res => {
                console.log(res)
                getRoutine(user)
            })
    }
    //******************* Loop to display all saved routines *********************/
    const usersRoutines = userRoutines.map((r, i) => {
        console.log("image??: ", r.routine[0].imageUrl)
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