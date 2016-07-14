import React from 'react';
import marked from 'marked';

export default class Comment extends React.Component {
  rawmarkup() {
    const rawMarkup = marked(this.props.children.toString(), { sanitize: true });
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawmarkup()} />
      </div>
    );
  }
}

Comment.propTypes = { children: React.PropTypes.string.isRequired,
                      author: React.PropTypes.string.isRequired };
