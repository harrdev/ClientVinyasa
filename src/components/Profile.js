import { useEffect } from 'react'
import { getRoutine } from '../api/routine'

const Profile = (props) => {
	const { msgAlert, user } = props
	console.log('users profile', user)
	// console.log('This is userRoutines', getRoutine())
	// const showRoutine = () => {
	// 	getRoutine(user)
	// 	.then(res => console.log('This is the response:', res))
	// }

	useEffect(() => {
		getRoutine(user)
		.then(res => {
			res = Object.values(res.data.routine)
			console.log('this is profile res', res[0].routine)
		})
	}, [])

	return (
		<>
			<h2>Profile Page</h2>
		</>
	)
}

export default Profile