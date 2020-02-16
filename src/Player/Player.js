import React from 'react'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import Game from '../Game'
import { gameStatus } from '../state/constants'
import { getCurrentGame } from '../state/selectors'
import Welcome from './Welcome'

const Player = ({ user }) => {
  useFirestoreConnect({ collection: 'games', doc: user.gameId, storeAs: 'currentGame' })
  const game = useSelector(getCurrentGame)

  if (!game) {
    return null
  }

  const isGameActive = game.status === gameStatus.active
  return <Container fluid>{isGameActive ? <Game {...game} /> : <Welcome {...user} />}</Container>
}

export default Player
