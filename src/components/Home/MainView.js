import React from 'react'
import { connect } from 'react-redux'
import ArticleList from '../ArticleList'
import agent from '../../agent'

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: 'CHANGE_TAB', tab, payload })
})

const YourFeedTab = props => {
  console.log('props.token MAINVIEW', props);
  if(props.token) {
    const clickHandler = e => {
      e.preventDefault()
      props.onTabClick('feed', agent.Articles.feed())
    }

    return (
      <li className="nav-item">
        <a href=""
          className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
          onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    )
  }

  return null
}

const GlobalFeedTab = props => {
  const clickHandler = e => {
    e.preventDefault()
    props.onTabClick('all', agent.Articles.all())
  }

  return (
    <li className="nav-item">
      <a href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  )
}

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab
            tab={props.tab}
            onTabClick={props.onTabClick}
          />
        </ul>
      </div>

      <ArticleList articles={props.articles}/>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
