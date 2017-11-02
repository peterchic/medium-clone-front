import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) =>
    dispatch({ type: 'DELETE_COMMENT', payload, commentId}) //need to double check what I'm returning as payload?
})

const DeleteButton = props => {
  const del = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId)
    props.onClick(payload, props.commentId)
  }

  if(props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    )
  }
  return null
}

export default connect (() => ({}), mapDispatchToProps)(DeleteButton)
