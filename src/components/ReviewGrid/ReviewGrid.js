import React from 'react';
import ReviewItem from './ReviewItem';
import ReviewGridStyles from './ReviewGrid.module.css';

const ReviewGrid = props => {
  return (
    <div className={ReviewGridStyles.GridContainer}>
      <ul>
        {props.posts.map(post => (
          <li key={post.id}>
            <ReviewItem
              title={post.title}
              image={post.image}
              body={post.body}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewGrid;
