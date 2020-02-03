import { getFirebase } from 'react-redux-firebase'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const initialState = {}
export const store = createStore(rootReducer, initialState, applyMiddleware(thunk.withExtraArgument(getFirebase)))
