import React from 'react'
import CardDeck from 'react-bootstrap/CardDeck'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { startGame } from '../../state/actions'
import { gameStatus } from '../../state/constants'
import { getPlayers } from '../../state/selectors'
import ActiveGame from './ActiveGame'
import Code from './Code'
import PlayerList from './PlayerList'
import StartGameButton from './StartGameButton'

const Lobby = ({ id, code, status, round }) => {
  const dispatch = useDispatch()
  useFirestoreConnect({ collection: 'users', where: ['gameId', '==', id], storeAs: 'players' })
  const players = useSelector(getPlayers)
  const isGameActive = status === gameStatus.inProgress

  return (
    <>
      <CardDeck className="mb-4">
        <Code code={code} />
        <PlayerList players={players} />
      </CardDeck>
      {isGameActive ? <ActiveGame round={round} /> : <StartGameButton onClick={() => dispatch(startGame())} />}
    </>
  )
}

export default Lobby
