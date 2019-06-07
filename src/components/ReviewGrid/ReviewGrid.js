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
              onDashboard={props.onDashboard}
              likes={post.likes}
              views={post.views}
              id={post.id}
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
