import React from 'react'
import CardDeck from 'react-bootstrap/CardDeck'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import Game from '../../Game'
import { startGame } from '../../state/actions'
import { gameStatus } from '../../state/constants'
import { getPlayers } from '../../state/selectors'
import Code from './Code'
import PlayerList from './PlayerList'
import StartGameButton from './StartGameButton'

const Lobby = game => {
  const { id, status, code } = game
  const dispatch = useDispatch()
  useFirestoreConnect({ collection: 'users', where: ['gameId', '==', id], storeAs: 'players' })
  const players = useSelector(getPlayers)
  const isGameActive = status === gameStatus.active

  return (
    <>
      <CardDeck className="mb-4">
        <Code code={code} />
        <PlayerList players={players} game={game} />
      </CardDeck>
      {isGameActive ? <Game {...game} /> : <StartGameButton onClick={() => dispatch(startGame())} />}
    </>
  )
}

export default Lobby
