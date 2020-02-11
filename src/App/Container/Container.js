import React from 'react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions'
import Admin from '../../Admin/Admin'
import Player from '../../Player'

const Container = () => {
  const dispatch = useDispatch()
  const [user] = useSelector(state => state.firestore.ordered.currentUser || [])

  if (!user) {
    return null
  }

  return (
    <>
      <Navbar variant="dark" bg="dark" className="mb-4">
        <Navbar.Brand>Actuarium</Navbar.Brand>
        <Navbar.Text className="ml-auto mr-2">{user.displayName}</Navbar.Text>
        <Button size="sm" variant="outline-secondary" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </Navbar>
      {user.isAdmin ? <Admin user={user} /> : <Player user={user} />}
    </>
  )
}

export default Container
