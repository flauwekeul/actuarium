import firebase from 'firebase/app'
import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { isEmpty, isLoaded, ReactReduxFirebaseProvider, useFirestoreConnect } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { rrfConfig as config } from '../config'
import { store } from '../store'
import Login from './Login'

export const withRedux = Component => props => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
)

const reactReduxFirebaseProps = {
  firebase,
  config,
  dispatch: store.dispatch,
  createFirestoreInstance
}
export const withReactReduxFirebase = Component => props => (
  <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
    <Component {...props} />
  </ReactReduxFirebaseProvider>
)

export const withAuth = Component => props => {
  const auth = useSelector(state => state.firebase.auth)

  if (!isLoaded(auth)) {
    // todo: display loading state
    return null
  }

  if (isEmpty(auth)) {
    return <Login />
  }

  return <Component {...props} auth={auth} />
}

export const withCurrentUser = Component => ({ auth, ...props }) => {
  useFirestoreConnect({ collection: 'users', doc: auth.uid, storeAs: 'currentUser' })
  return <Component {...props} />
}
