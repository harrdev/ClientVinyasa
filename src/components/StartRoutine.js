import CreateRoutine from "./CreateRoutine"
import { getSelectedRoutine } from "../api/routine"
import { useEffect } from 'react'

const StartRoutine = (props) => {
    const { msgAlert, user, addPose } = props
    console.log('props in start routine', props)


    useEffect(() => {
		getSelectedRoutine(user)
	},)
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