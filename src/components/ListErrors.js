import React, { Component } from 'react'

export default class ListErrors extends Component {
  render(){
    const { errors } = this.props

    if(errors){
      return (
        <ul className="error-message">
          {
            Object.keys(errors).map( key => {
              return (
                <li key={key}>
                  {key} {errors[key]}
                </li>
              )
            })
          }
        </ul>
      )
    } else {
      return null
    }
  }
}
