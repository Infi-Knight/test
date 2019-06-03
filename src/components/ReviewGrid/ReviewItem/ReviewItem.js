import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { Button, SIZE } from 'baseui/button';
import './ReviewItem.module.css';

const ReviewItem = props => {
  return (
    <Card
      overrides={{
        Root: {
          style: { width: '320px' },
        },
      }}
      title={props.title}
    >
      <StyledThumbnail src={props.image} />
      <StyledBody>{`${props.body.substring(0, 64)}...`}</StyledBody>
      <StyledAction>
        <NavLink to={`/review/${props.id}`}>
          <Button size={SIZE.compact} style={{ width: '100%' }}>
            More info
          </Button>
        </NavLink>
      </StyledAction>
    </Card>
  );
};

export default ReviewItem;
