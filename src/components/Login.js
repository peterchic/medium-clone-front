import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListErrors from './ListErrors'
import agent from '../agent'
// import auth from '../reducers/auth'

const mapStateToProps = state => ({...state.auth})

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: 'LOGIN', payload: agent.Auth.login(email, password) })
})

class Login extends Component {
  constructor(){
    super()

    this.changeEmail = e => this.props.onChangeEmail(e.target.value)
    this.changePassword = e => this.props.onChangePassword(e.target.value)
    this.submitForm = (email, password) => e => {
      e.preventDefault()
      this.props.onSubmit(email, password)
    }
  }
  render(){
    const { email, password } = this.props
    return(
      <div className="auth-page">
       <div className="container page">
         <div className="row">

           <div className="col-md-6 offset-md-3 col-xs-12">
             <h1 className="text-xs-center">Sign In</h1>
             <p className="text-xs-center">
               <a>
                 Need an account?
               </a>
             </p>
             <ListErrors errors={this.props.errors}/>

             <form onSubmit={this.submitForm(email, password)}>
               <fieldset>

                 <fieldset className="form-group">
                   <input
                     className="form-control form-control-lg"
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={this.changeEmail}
                    />
                 </fieldset>

                 <fieldset className="form-group">
                   <input
                     className="form-control form-control-lg"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={this.changePassword}
                   />
                 </fieldset>

                 <button
                   className="btn btn-lg btn-primary pull-xs-right"
                   type="submit"
                   disabled={this.props.inProgress}
                   >
                   Sign in
                 </button>

               </fieldset>
             </form>
           </div>

         </div>
       </div>
     </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
