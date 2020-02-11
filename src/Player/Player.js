import React from 'react'
import Container from 'react-bootstrap/Container'

const Player = ({ user }) => {
  return (
    <Container fluid>
      <h1>Hi {user.displayName}!</h1>
      <p>Wait for the teacher to start the game…</p>
    </Container>
  )
}

export default Player
