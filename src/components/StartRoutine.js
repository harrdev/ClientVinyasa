import CreateRoutine from "./CreateRoutine"

const StartRoutine = (props) => {
	const { msgAlert, user, addPose } = props
	console.log('props in start routine', props)

	return (
		<>
			<h2>Start Routine</h2>
		</>
	)
}

export default StartRoutine