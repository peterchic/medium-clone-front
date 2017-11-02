import React, { Component } from 'react'
import Banner from './Banner'
import MainView from './MainView'
import { connect } from 'react-redux'
import agent from '../../agent'

// const Promise = global.Promise

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', payload }),
  onUnload: () =>
    dispatch ({ type: 'HOME_PAGE_UNLOADED' })
})

// Each function that mapDispatchToProps() returns gets attached to the component's props.
// This means your component can call this.props.onLoad() to fire off an event
// with type 'HOME_PAGE_LOADED' and a 'payload', which is the Promise from our request.


class Home extends Component {
  componentWillMount(){
    const tab = this.props.token ? 'feed' : 'all'
    console.log('what?', tab);
    const articlesPromise = this.props.token ?
      agent.Articles.feed() :
      agent.Articles.all()

    this.props.onLoad(tab, articlesPromise)
  }

  render() {
    return(
      <div className="home-page">
        <Banner appName={this.props.appName}/>
        <div className="container page">
          <div className="row">
          <MainView />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
