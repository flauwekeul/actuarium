import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import Game, { isActive } from '../Game'
import { getCurrentGame } from '../state/selectors'
import Consumer from './Consumer'
import Insurer from './Insurer'
import Welcome from './Welcome'

const Player = ({ user }) => {
  const { gameId, role, displayName } = user
  useFirestoreConnect({ collection: 'games', doc: gameId, storeAs: 'currentGame' })
  const game = useSelector(getCurrentGame)

  if (!game) {
    return null
  }

  const controlsForRole = role => role && <div className="mt-3">{role === 'insurer' ? <Insurer /> : <Consumer />}</div>

  const activeGame = (
    <>
      <h2 className="mb-4">
        You're a <Badge variant="secondary">{role}</Badge>, {displayName}.
      </h2>
      <Game {...game} controls={controlsForRole(role)} />
    </>
  )

  return <Container fluid>{isActive(game) ? activeGame : <Welcome {...user} />}</Container>
}

export default Player
