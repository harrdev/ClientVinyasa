import { getSelectedRoutine } from "../api/routine"
import { useEffect, useState } from 'react'
import { useParams } from "react-router";

const StartRoutine = (props) => {
    const { user } = props
    const routineId = useParams()

    const [selectedRoutine, setSelectedRoutine] = useState([])

    //******************** useEffect to call database and pull in selected routine from profile page *******************/
    useEffect(() => {
        getSelectedRoutine(user, routineId)
            .then(res => {
                console.log("Res from API call: ", res)
                res = Object.values(res.data.routine)
                setSelectedRoutine(res)
            })
            .catch(error => {
                console.log("error resolving")
            })
	}, [])

    console.log("selectedRoutine state: ", selectedRoutine[1])
// let timeleft = 10
// let downloadTimer = setInterval(function () {
//     if (timeleft <= 0) {
//         clearInterval(downloadTimer)
//     }
//     document.getElementById("routtineTimer").value = 10 - timeleft
//     timeleft -= 1
// }, 1000)


return (
    <>
        <div>
            {/* <progress value="0" max="100" id="routineTimer"></progress> */}
        </div>
        <h2>Start Routine</h2>
    </>
)
}

export default StartRoutine