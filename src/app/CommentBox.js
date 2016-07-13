import React from 'react';
import request from 'superagent';
import CommentList from './CommentList';
// import CommentForm from './CommentForm';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
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

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div>
        <h1>aiueo</h1>
        <CommentList data={this.state.data} />
      </div>
    );
  }
}
