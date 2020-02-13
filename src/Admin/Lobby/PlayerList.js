import { isEmpty } from 'ramda'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'

const noPlayers = <p>Waiting for players to join…</p>

const listPlayers = players => (
  <>
    <p>These players are participating:</p>
    <p className="h2">
      {players.map(({ displayName }, i) => (
        <Badge key={i} variant="secondary" pill className="m-1">
          {displayName}
        </Badge>
      ))}
    </p>
  </>
)

const PlayerList = ({ players }) => (
  <Card>
    <Card.Header as="h3">Players</Card.Header>
    <Card.Body>{isEmpty(players) ? noPlayers : listPlayers(players)}</Card.Body>
  </Card>
)

export default PlayerList
