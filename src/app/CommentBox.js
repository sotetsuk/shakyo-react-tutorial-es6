import React from 'react';
import request from 'superagent';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  loadCommentsFromServer() {
    request
      .get(this.props.url)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({ data: res.body });
      });
  }

  handleCommentSubmit(comment) {
    const newComment = comment;
    const comments = this.state.data;
    newComment.id = Date.now();
    const newComments = comments.concat([newComment]);
    this.setState({ data: newComments });
    request
      .post(this.props.url)
      .send(newComment)
      .end((err, res) => {
        if (err) {
          this.setState({ data: comments });
          throw err;
        }
        this.setState({ data: res.body });
      });
  }

  render() {
    return (
      <div>
        <h1>React tutorial w/ ES6!</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

CommentBox.propTypes = { pollInterval: React.PropTypes.number,
                         url: React.PropTypes.string };
