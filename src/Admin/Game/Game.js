import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import Code from './Code'
import PlayerList from './PlayerList'

const Game = ({ id, code }) => {
  useFirestoreConnect({ collection: 'users', where: ['gameId', '==', id], storeAs: 'players' })
  const players = useSelector(state => state.firestore.ordered.players || [])

  return (
    <Row>
      <Col sm className="mb-4">
        <Code code={code} />
      </Col>
      <Col sm className="mb-4">
        <PlayerList players={players} />
      </Col>
    </Row>
  )
}

export default Game
