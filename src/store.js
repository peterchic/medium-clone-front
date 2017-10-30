import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseMiddleware } from './middleware'
import home from './reducers/home'
import common from './reducers/common'
import auth from './reducers/auth'
import settings from './reducers/settings'

const reducers = combineReducers({
  auth,
  home,
  common,
  settings
})

const middleware = applyMiddleware(promiseMiddleware)

const store = createStore(reducers, middleware)

export default store
