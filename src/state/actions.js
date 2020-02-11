import { createRandomCode } from '../utils'
import { gameStatus } from './constants'
import { getCurrentGame, getCurrentUser } from './selectors'

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
  const { id } = getCurrentGame(getState())

  return getFirebase()
    .firestore()
    .collection('games')
    .doc(id)
    .update({ status: gameStatus.inProgress })
}
