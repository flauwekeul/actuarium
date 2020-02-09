import { createRandomCode } from './utils'

export const loginAdmin = () => async (dispatch, getState, getFirebase) => {
  const { login } = getFirebase()
  return login({ provider: 'google', type: 'popup' })
}

export const loginPlayer = ({ displayName, gameId }) => async (dispatch, getState, getFirebase) => {
  const { auth, firestore } = getFirebase()
  const { user } = await auth().signInAnonymously()

  await user.updateProfile({ displayName })

  return firestore()
    .collection('users')
    .doc(user.uid)
    .set({ displayName, gameId })
}

export const logout = () => async (dispatch, getState, getFirebase) => {
  const { firebase } = getState()
  const { logout } = getFirebase()
  const { isAnonymous } = firebase.auth

  // todo: use a function isPlayer() instead
  if (isAnonymous) {
    await dispatch(removePlayer())
  }

  return logout()
}

export const removePlayer = () => async (dispatch, getState, getFirebase) => {
  const { firebase } = getState()
  const { firestore } = getFirebase()
  const { uid } = firebase.auth

  return firestore()
    .collection('users')
    .doc(uid)
    .delete()
}

export const createGame = () => async (dispatch, getState, getFirebase) => {
  const { firebase } = getState()
  const { firestore } = getFirebase()

  return firestore()
    .collection('games')
    .add({
      createdBy: firebase.auth.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
      code: createRandomCode(),
      status: 'created', // created | inProgress | stopped | finished,
      round: 1
    })
}
