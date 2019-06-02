import React from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { Button } from 'baseui/button';

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
        <Button style={{ width: '100%' }}>More info</Button>
      </StyledAction>
    </Card>
  );
};

export default ReviewItem;
