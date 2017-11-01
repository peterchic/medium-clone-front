import React, {Component} from 'react'
import agent '../../agent'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) =>
    dispatch({ type: 'DELETE_COMMENT', payload, commentId}) //need to double check what I'm returning as payload?
})
