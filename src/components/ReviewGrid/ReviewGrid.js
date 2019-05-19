import React from 'react';
import ReviewItem from './ReviewItem';
import './ReviewGrid.module.css';

const ReviewGrid = props => {
  return (
    <ul>
      {props.posts.map(post => (
        <ReviewItem
          key={post.id}
          title={post.title}
          image={`https://media.graphcms.com/resize=w:328,h:328,fit:crop/${
            post.image.handle
          }`}
          body={post.body}
        />
      ))}
    </ul>
  );
};

export default ReviewGrid;
