import React from 'react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions'

const Container = ({ children }) => {
  const dispatch = useDispatch()
  const { displayName } = useSelector(state => state.firebase.auth)

  return (
    <>
      <Navbar variant="dark" bg="dark" className="mb-4">
        <Navbar.Brand>Actuarium</Navbar.Brand>
        <Navbar.Text className="ml-auto mr-2">{displayName}</Navbar.Text>
        <Button size="sm" variant="outline-secondary" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </Navbar>
      {children}
    </>
  )
}

export default Container
