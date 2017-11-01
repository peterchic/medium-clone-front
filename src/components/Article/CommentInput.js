import React, { Component} from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: 'ADD_COMMENT', payload})
})

class CommentInput extends Component {
  constructor(){
    super()
    this.state = {
      body: ''
    }

    this.setBody = e => {
      this.setState({ body: e.target.value })
    }

    this.createComment = e => {
      e.preventDefault()
      const payload = agent.Comments.create( this.props.slug, {body: this.state.body } )
      this.setState({ body: ''})
      this.props.onSubmit(payload)
    }
  }

  render(){
    return(
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3"
          />

          <div className="card-footer">
            <img
              src={this.props.currentUser.image}
              className="comment-author-img"
            />
              <button
                className="btn btn-sm btn-primary"
                type="submit">
                Post Comments
              </button>
          </div>
        </div>
      </form>
    )
  }
}

export default connect(() => {()}, mapDispatchToProps)(CommentInput)
