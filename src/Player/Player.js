import React from 'react'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import Game, { isActive } from '../Game'
import { getCurrentGame } from '../state/selectors'
import Welcome from './Welcome'

const Player = ({ user }) => {
  useFirestoreConnect({ collection: 'games', doc: user.gameId, storeAs: 'currentGame' })
  const game = useSelector(getCurrentGame)

  if (!game) {
    return null
  }

  return <Container fluid>{isActive(game) ? <Game {...game} /> : <Welcome {...user} />}</Container>
}

export default Player
