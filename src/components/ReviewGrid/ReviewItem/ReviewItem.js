import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, StyledBody, StyledThumbnail } from 'baseui/card';
import ReviewItemStyles from './ReviewItem.module.css';
import AuthContext from '../../Auth';

const ReviewItem = props => {
  const { scope } = useContext(AuthContext);

  return (
    <Card
      overrides={{
        Root: {
          style: { width: '300px' },
        },
      }}
      title={props.title}
    >
      <NavLink to={`/review/${props.id}`}>
        <StyledThumbnail src={props.image} />
      </NavLink>
      <StyledBody>
        <NavLink to={`/review/${props.id}`}>{`${props.body.substring(
          0,
          140
        )}...`}</NavLink>
        <div className={ReviewItemStyles.LikeViewContainer}>
          <div>Views: {props.views ? props.views : 0}</div>
          <div>Likes: {props.likes ? props.likes : 0}</div>
          {scope === 'admin' && props.onDashboard && (
            <button className={ReviewItemStyles.Action}>Publish</button>
          )}
          {props.onDashboard && (
            <button className={ReviewItemStyles.Action}>
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
          )}
        </div>
      </StyledBody>
    </Card>
  );
};

export default ReviewItem;
