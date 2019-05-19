import React from 'react';
import { Card, StyledBody } from 'baseui/card';

const ReviewItem = props => {
  return (
    <Card
      overrides={{ Root: { style: { width: '328px' } } }}
      headerImage={props.image}
      title={props.title}
    >
      <StyledBody>{props.body}</StyledBody>
    </Card>
  );
};

export default ReviewItem;
