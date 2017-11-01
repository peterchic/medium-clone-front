import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://conduit.productionready.io/api'

const responseBody = res => res.body

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
}

const Articles = {
  all: page =>
    requests.get('/articles?limit=10'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  del: slug =>
    requests.del(`/articles/${slug}`)
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: {email, password}} ),
  register: (username, email, password) =>
    requests.post('/users', { user: {username, email, password}} ),
  save: user =>
    requests.put('/user', { user })
}

const Comments = {
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }), //unclear how this is working { comment }
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
}

export default {
  Articles,
  Auth,
  Comments,
  setToken: _token => { token = _token }
}
