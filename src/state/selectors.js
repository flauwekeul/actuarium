import { concat, head, of, pathOr, pipe } from 'ramda'

const inOrdered = pipe(of, concat(['firestore', 'ordered']), pathOr([]))

export const getCurrentUser = pipe(inOrdered('currentUser'), head)

export const getCurrentGame = pipe(inOrdered('currentGame'), head)

export const getPlayers = pipe(inOrdered('players'))

export const getInputForRound = round => pipe(getCurrentUser, pathOr('', [`round${round}`, 'input']))
