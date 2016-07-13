import React from 'react';
import ReactDom from 'react-dom';
import CommentBox from './CommentBox';

ReactDom.render(
  <CommentBox url="http://localhost:3001/api/comments" pollInterval={2000} />,
  document.getElementById('app')
);
