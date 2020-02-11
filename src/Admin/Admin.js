import React from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { createGame } from '../actions'
import CreateGame from './CreateGame'
import GameLobby from './GameLobby'

const Admin = ({ user }) => {
  const dispatch = useDispatch()
  useFirestoreConnect({ collection: 'games', where: ['createdBy', '==', user.id] })
  const [game] = useSelector(state => state.firestore.ordered.games || [])

  return (
    <Container fluid>
      <Jumbotron>
        <h1 className="text-center mb-4">Current game</h1>
        {game ? <GameLobby {...game} /> : <CreateGame click={() => dispatch(createGame())} />}
      </Jumbotron>
    </Container>
  )
}

export default Admin
