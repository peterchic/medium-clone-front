import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseMiddleware } from './middleware'
import home from './reducers/home'
import common from './reducers/common'
import auth from './reducers/auth'

const reducers = combineReducers({
  auth,
  home,
  common
})

const middleware = applyMiddleware(promiseMiddleware)

const store = createStore(reducers, middleware)

export default store
