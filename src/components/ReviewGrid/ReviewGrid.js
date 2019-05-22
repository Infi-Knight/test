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
          image={post.image}
          body={post.body}
        />
      ))}
    </ul>
  );
};

export default ReviewGrid;
