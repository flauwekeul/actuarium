import React from 'react'
import Button from 'react-bootstrap/Button'

const StartGameButton = ({ onClick }) => (
  <Button variant="primary" size="lg" onClick={onClick}>
    Start game!
  </Button>
)

export default StartGameButton
