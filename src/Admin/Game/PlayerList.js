import { always, ifElse, isEmpty, pipe, prop } from 'ramda'
import React from 'react'
import Badge from 'react-bootstrap/Badge'

const noPlayers = always(<p>Waiting for players to join…</p>)

const listPlayers = players => (
  <>
    <h3>Players</h3>
    <p>These players are waiting:</p>
    <p className="h2">
      {players.map(({ displayName }, i) => (
        <Badge key={i} variant="secondary" pill className="mr-2">
          {displayName}
        </Badge>
      ))}
    </p>
  </>
)

const PlayerList = pipe(prop('players'), ifElse(isEmpty, noPlayers, listPlayers))

export default PlayerList
