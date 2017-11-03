import React from 'react';
import { Link } from 'react-router';
import agent from '../agent'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  onFavorite: slug => dispatch({
    type: 'ARTICLE_FAVORITED',
    payload: agent.Articles.favorite(slug)
  }),
  onUnfavorite: slug => dispatch({
    type: 'ARTICLE_UNFAVORITED',
    payload: agent.Articles.unfavorite(slug)
  })
})

const ArticlePreview = props => {
  const article = props.article;

  const handleClick = ev => {
    console.log('direct hit!', props);
    ev.preventDefault();
    if (article.favorited) {
      props.onUnfavorite(article.slug);
    } else {
      props.onFavorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`@${article.author.username}`}>
          <img src={article.author.image} />
        </Link>

        <div className="info">
          <Link className="author" to={`@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className="btn btn-sm btn-outline-primary" onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview)
