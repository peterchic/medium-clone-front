import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseMiddleware, localStorageMiddleware } from './middleware'
import article from './reducers/article'
import articleList from './reducers/articleList'
import home from './reducers/home'
import common from './reducers/common'
import auth from './reducers/auth'
import profile from './reducers/profile'
import settings from './reducers/settings'
import editor from './reducers/editor'
import { createLogger } from 'redux-logger'

const reducers = combineReducers({
  article,
  articleList,
  auth,
  home,
  common,
  settings,
  profile,
  editor
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger())

const store = createStore(reducers, middleware)

export default store
