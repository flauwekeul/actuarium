import React from 'react'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { createGame } from '../state/actions'
import { getCurrentGame } from '../state/selectors'
import CreateGame from './CreateGame'
import Game from './Game'

const Admin = ({ user }) => {
  const dispatch = useDispatch()
  useFirestoreConnect({ collection: 'games', where: ['createdBy', '==', user.id], storeAs: 'currentGame' })
  const game = useSelector(getCurrentGame)

  return <Container fluid>{game ? <Game {...game} /> : <CreateGame click={() => dispatch(createGame())} />}</Container>
}

export default Admin
