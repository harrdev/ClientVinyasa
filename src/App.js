// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import apiUrl from './apiConfig'
import { getAsanas } from "./api/asana"

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Profile from './components/Profile'
import StartRoutine from './components/StartRoutine'
import PoseDetail from './components/PoseDetail'
import CreateRoutine from './components/CreateRoutine'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  let [pose, setPose] = useState([])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return (prevState.filter((msg) => msg.id !== id))
    })
  }

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(() => {
      return (
        [{ heading, message, variant, id }]
      )
    })
  }
  	// Call getAsanas API get function
	// run getAsanas and 
  const addPoses = () => {
	  getAsanas()
	  	.then(res => {
			  setPose(res.data.asanas)
		  })
  }
  useEffect(() => {
	  addPoses()
  }, [user])


  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
        <Route
          path='/sign-up'
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path='/sign-in'
          element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path='/sign-out'
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/createroutine'
          element={
            <RequireAuth user={user}>
              <CreateRoutine msgAlert={msgAlert} user={user} pose={pose} />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth user={user}>
              <Profile msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/startroutine'
          element={
            <RequireAuth user={user}>
              <StartRoutine msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/posedetail'
          element={
            <RequireAuth user={user}>
              <PoseDetail msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/change-password'
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>}
        />
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  )
}

export default App
