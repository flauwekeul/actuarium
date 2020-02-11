import { always, ifElse, isEmpty, pipe, prop } from 'ramda'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'

const noPlayers = always(<p>Waiting for players to join…</p>)

const listPlayers = players => (
  <Card>
    <Card.Header as="h3">Players</Card.Header>
    <Card.Body>
      <p>These players are participating:</p>
      <p className="h2">
        {players.map(({ displayName }, i) => (
          <Badge key={i} variant="secondary" pill className="mr-2">
            {displayName}
          </Badge>
        ))}
      </p>
    </Card.Body>
  </Card>
)

const PlayerList = pipe(prop('players'), ifElse(isEmpty, noPlayers, listPlayers))

export default PlayerList
