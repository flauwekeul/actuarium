import { always, cond, groupBy, isEmpty, pipe, prop } from 'ramda'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import { gameStatus } from '../../state/constants'

const list = players =>
  players.map(({ displayName }, i) => (
    <Badge key={i} variant="secondary" pill className="m-1">
      {displayName}
    </Badge>
  ))

const noPlayers = <p>Waiting for players to join…</p>

const allPlayers = players => (
  <>
    <p>These players are waiting for the game to start:</p>
    <p className="h3">{list(players)}</p>
  </>
)

const playersByRole = ({ insurer, consumer }) => (
  <>
    <p className="h3">
      <small className="mr-2">Insurers:</small>
      {!isEmpty(insurer) && list(insurer)}
    </p>
    <p className="h3">
      <small className="mr-2">Consumers:</small>
      {!isEmpty(consumer) && list(consumer)}
    </p>
  </>
)

const PlayerList = ({ players, game }) => {
  // todo: this is duplicated
  const isGameCreated = () => game.status === gameStatus.created
  const isGameActive = () => game.status === gameStatus.active
  const list = cond([
    [isEmpty, always(noPlayers)],
    [isGameCreated, allPlayers],
    [isGameActive, pipe(groupBy(prop('role')), playersByRole)]
  ])

  return (
    <Card>
      <Card.Header as="h3">Players</Card.Header>
      <Card.Body>{list(players)}</Card.Body>
    </Card>
  )
}

export default PlayerList
