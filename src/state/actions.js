import { concat, map, pipe, prop, reduce, splitAt } from 'ramda'
import { gameStatus } from '../Game'
import { createRandomCode, shuffle } from '../utils'
import { getCurrentGame, getCurrentUser, getPlayers } from './selectors'

export const loginAdmin = () => async (dispatch, getState, getFirebase) => {
  return getFirebase().login({ provider: 'google', type: 'popup' })
}

export const loginPlayer = ({ displayName, gameId }) => async (dispatch, getState, getFirebase) => {
  const { auth, firestore } = getFirebase()
  const { user } = await auth().signInAnonymously()

  // the profile of anonymous users (players) aren't stored automatically, so this is done manually:
  return firestore()
    .collection('users')
    .doc(user.uid)
    .set({ displayName, gameId, isAdmin: false })
}

export const logout = () => async (dispatch, getState, getFirebase) => {
  const { id, isAdmin } = getCurrentUser(getState())
  const { logout, firestore } = getFirebase()

  // remove user from users collection
  await firestore()
    .collection('users')
    .doc(id)
    .delete()

  if (!isAdmin) {
    await dispatch(deleteUserAccount())
  }

  return logout()
}

export const deleteUserAccount = () => async (dispatch, getState, getFirebase) => {
  return getFirebase()
    .auth()
    .currentUser.delete()
}

export const createGame = () => async (dispatch, getState, getFirebase) => {
  const { id } = getCurrentUser(getState())
  const { firestore } = getFirebase()

  return firestore()
    .collection('games')
    .add({
      createdBy: id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      code: createRandomCode(),
      status: gameStatus.created,
      round: 1
    })
}

export const startGame = () => async (dispatch, getState, getFirebase) => {
  const { firestore } = getFirebase()
  const playersCollection = firestore().collection('users')
  const batch = firestore().batch()
  const shuffledPlayerIds = pipe(getState, getPlayers, map(prop('id')), shuffle)()
  // 1 insurer for every 6 players
  const nrOfInsurers = Math.ceil(shuffledPlayerIds.length / 6)
  const [insurerIds, consumerIds] = splitAt(nrOfInsurers, shuffledPlayerIds)
  const insurers = map(id => ({ id, role: 'insurer' }), insurerIds)
  const consumers = map(id => ({ id, role: 'consumer' }), consumerIds)
  const batchUpdatePlayers = pipe(
    concat,
    reduce((batch, { id, role }) => batch.update(playersCollection.doc(id), { role }), batch)
  )(insurers, consumers)

  await batchUpdatePlayers.commit()

  const { id } = getCurrentGame(getState())
  return firestore()
    .collection('games')
    .doc(id)
    .update({ status: gameStatus.active })
}
