import { getByPlaceholderText } from '@testing-library/react'
import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
	fontFamily: '"Syncopate", sans-serif',
	fontWeight: '600',
    color: 'white',
    textDecoration: 'none',
}
const authenticatedOptions = (
	<>
		<Nav.Link>
			<Link to='./profile' style={linkStyle}>
				Profile
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='./createroutine' style={linkStyle}>
				Create Routine
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        {/* <Nav.Link>
		    <Link to='sign-up'>Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in'>Sign In</Link>
        </Nav.Link> */}
	</>
)

// const alwaysOptions = (
// 	<>
		{/* <Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link> */}
	{/* </>
) */}

const Header = ({ user }) => (
	<Navbar id='navbar' bg='forest' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle} className='appName'>
                Vinyasa Builder
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{/* {alwaysOptions} */}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
