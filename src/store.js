import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseMiddleware, localStorageMiddleware } from './middleware'
import article from './reducers/article'
import home from './reducers/home'
import common from './reducers/common'
import auth from './reducers/auth'
import settings from './reducers/settings'

const reducers = combineReducers({
  article,
  auth,
  home,
  common,
  settings
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducers, middleware)

export default store
