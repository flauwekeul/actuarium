import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { compose } from 'ramda'
import { firebaseConfig } from '../config'
import Container from './Container'
import { withAuth, withCurrentUser, withReactReduxFirebase, withRedux } from './hocs'

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const App = compose(withRedux, withReactReduxFirebase, withAuth, withCurrentUser)(Container)

export default App
