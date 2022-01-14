import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const unauthenticatedOptions = (
		<>
			<Nav.Link>
				<Link to='sign-up'>Sign Up</Link>
			</Nav.Link>
			<Nav.Link>
				<Link to='sign-in'>Sign In</Link>
			</Nav.Link>
		</>
	)

	return (
		<>
			<h2>Home Page</h2>
			{unauthenticatedOptions}
		</>
	)
}

export default Home
