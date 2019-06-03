import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, StyledBody, StyledThumbnail } from 'baseui/card';
import ReviewItemStyles from './ReviewItem.module.css';

const ReviewItem = props => {
  return (
    <NavLink to={`/review/${props.id}`}>
      <Card
        overrides={{
          Root: {
            style: { width: '300px' },
          },
        }}
        title={props.title}
      >
        <StyledThumbnail src={props.image} />
        <StyledBody>
          {`${props.body.substring(0, 140)}...`}
          <div className={ReviewItemStyles.LikeViewContainer}>
            <div>Views: {props.views ? props.views : 0}</div>
            <div>Likes: {props.likes ? props.likes : 0}</div>
          </div>
        </StyledBody>
      </Card>
    </NavLink>
  );
};

export default ReviewItem;
