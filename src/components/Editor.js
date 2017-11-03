import ListErrors from './ListErrors'
import React, { Component} from 'react'
import agent from '../agent'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  ...state.editor
})

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: 'ADD_TAG'}),
  onLoad: payload =>
    dispatch({ type: 'EDITOR_PAGE_LOADED', payload}),
  onRemoveTag: tag =>
    dispatch({ type: 'REMOVE_TAG', tag}),
  onSubmit: payload =>
    dispatch({ type: 'ARTICLE_SUBMITTED', payload}),
  onUnload: () =>
    dispatch({ type: "EDITOR_PAGE_UNLOADED"}),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value})
})

class Editor extends Component {
  constructor(){
    super()

    const updateFieldEvent = key => e =>
      this.props.onUpdateField(key, e.target.value)

    this.changeTitle = updateFieldEvent('title')
    this.changeDescription = updateFieldEvent('description')
    this.changebody = updateFieldEvent('body')
    this.changeTagInput = updateFieldEvent('tagInput')

    this.watchForEnter = e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        this.props.onAddTag()
      }
    }

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag)
    }

    this.submitForm = e => {
      e.preventDefault()
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      }

      const slug = { slug: this.props.articleSlug }
      const promise = this.props.articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Article.create(article)

      this.props.onSubmit(promise)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug) {
      if (nextProps.params.slug) {
        return this.props.onLoad(agent.Articles.get(this.props.params.slug))
      }
      this.props.onLoad(null)
    }
  }

  componentWillMount(){
    if (this.props.slug){
      return this.props.onLoad(agent.Articles.get(this.props.params.slug))
    }
    this.props.onLoad(null)
  }

  componentWillUnmount(){
    this.props.onUnload()
  }
}

export default(mapStateToProps, mapDispatchToProps)(Editor)
