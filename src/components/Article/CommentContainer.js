import { Link  } from 'react-router'
import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <list-errors errors={props.errors}></list-errors>
          <CommentInput
            slug={props.slug} currentUser={props.currentUser}
          />
        </div>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    )
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="login">Sign in</Link>
          &nbsp; to add comments on this article.
        </p>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    )
  }
}

export default CommentContainer
