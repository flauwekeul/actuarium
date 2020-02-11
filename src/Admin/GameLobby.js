import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const GameLobby = ({ id, code }) => {
  const codeChars = code
    .toUpperCase()
    .split('')
    .map((char, i) => (
      <Badge key={i} variant="primary" className="mx-1">
        {char}
      </Badge>
    ))
  useFirestoreConnect({ collection: 'users', where: ['gameId', '==', id], storeAs: 'players' })
  const players = useSelector(state => state.firestore.ordered.players || [])

  return (
    <Row>
      <Col sm>
        <h4>Code</h4>
        <p>Join this game with code:</p>
        <p className="h1 text-monospace">{codeChars}</p>
      </Col>
      <Col sm>
        <h4>Players</h4>
        {players.length > 0 ? (
          <>
            <p>These players are waiting for the game to start:</p>
            <ListGroup horizontal="sm">
              {players.map(({ displayName }, i) => (
                <ListGroup.Item key={i} variant="info">
                  {displayName}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <p>Waiting for players to join…</p>
        )}
      </Col>
    </Row>
  )
}

export default GameLobby
