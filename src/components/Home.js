import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const unauthenticatedOptions = (
		<>
			<Nav.Link>
				<Link to='sign-up'><Button className='buttonHome' variant='dark' >Sign Up</Button></Link>
			</Nav.Link>
			<Nav.Link>
				<Link to='sign-in'><Button className='buttonHome' variant='dark' >Log In</Button></Link>
			</Nav.Link>
		</>
	)

	return (
		<>
			<div className="loginAndSignup">
				{unauthenticatedOptions}
			</div>
		</>
	)
}

export default Home
