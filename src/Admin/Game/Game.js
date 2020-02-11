import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { startGame } from '../../state/actions'
import { gameStatus } from '../../state/constants'
import { getPlayers } from '../../state/selectors'
import Code from './Code'
import PlayerList from './PlayerList'

const StartGameButton = ({ onClick }) => (
  <Button variant="primary" size="lg" onClick={onClick}>
    Start game!
  </Button>
)

const Game = ({ id, code, status }) => {
  const dispatch = useDispatch()
  useFirestoreConnect({ collection: 'users', where: ['gameId', '==', id], storeAs: 'players' })
  const players = useSelector(getPlayers)

  return (
    <>
      <Row className="mb-4">
        <Col sm>
          <Code code={code} />
        </Col>
        <Col sm>
          <PlayerList players={players} />
        </Col>
      </Row>
      {status === gameStatus.created ? (
        <StartGameButton onClick={() => dispatch(startGame())} />
      ) : (
        <Row className="mb-4">
          <Col sm>{status}</Col>
        </Row>
      )}
    </>
  )
}

export default Game
