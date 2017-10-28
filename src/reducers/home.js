export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME-PAGE-LOADED':
    return {
      ...state,
      articles: action.payload.articles
    }
  }

  return state
}
