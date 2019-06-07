import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, StyledBody, StyledThumbnail } from 'baseui/card';
import { Notification, KIND } from 'baseui/notification';
import ReviewItemStyles from './ReviewItem.module.css';
import AuthContext from '../../Auth';
import history from './../../../history';

const DELETE_REVIEW_MUTATION = gql`
  mutation deleteReviewMutation($input: PostWhereUniqueInput!) {
    deletePost(where: $input) {
      id
    }
  }
`;

const PUBLISH_REVIEW_MUTATION = gql`
  mutation publishReviewMutation(
    $data: PostUpdateInput!
    $where: PostWhereUniqueInput!
  ) {
    updatePost(data: $data, where: $where) {
      id
    }
  }
`;

const ReviewItem = props => {
  const [error, setError] = useState('');
  const { scope } = useContext(AuthContext);

  return (
    <Card
      overrides={{
        Root: {
          style: { width: '300px', height: '260px' },
        },
      }}
      title={props.title}
    >
      <NavLink to={`/review/${props.id}`}>
        <StyledThumbnail src={props.image} />
      </NavLink>
      <StyledBody>
        <div className={ReviewItemStyles.Body}>
          <NavLink to={`/review/${props.id}`}>
            {`${props.body.substring(0, 140)}...`}
          </NavLink>
        </div>
        <div className={ReviewItemStyles.LikeViewContainer}>
          <div>Views: {props.views ? props.views : 0}</div>
          <div>Likes: {props.likes ? props.likes : 0}</div>

          {scope === 'admin' &&
            props.onDashboard &&
            props.status !== 'PUBLISHED' && (
              <Mutation
                mutation={PUBLISH_REVIEW_MUTATION}
                variables={{
                  data: { status: 'PUBLISHED' },
                  where: { id: props.id },
                }}
                onError={() => setError('Unable to publish review')}
                onCompleted={() => history.push('/')}
              >
                {publishReviewMutation => (
                  <button
                    disabled={props.status === 'PUBLISHED' ? true : false}
                    onClick={publishReviewMutation}
                    className={ReviewItemStyles.Action}
                  >
                    Publish
                  </button>
                )}
              </Mutation>
            )}

          {props.onDashboard && (
            <Mutation
              mutation={DELETE_REVIEW_MUTATION}
              variables={{ input: { id: props.id } }}
              onError={() => setError('Unable to delete review')}
              onCompleted={() => history.push('/')}
            >
              {deletePostMutation => (
                <button
                  onClick={deletePostMutation}
                  className={ReviewItemStyles.Action}
                >
                  <i className="fa fa-trash-o" aria-hidden="true" />
                </button>
              )}
            </Mutation>
          )}

          <div>
            {error && (
              <Notification
                autoHideDuration={1000}
                closeable
                kind={KIND.negative}
              >
                {error}
              </Notification>
            )}
          </div>
        </div>
      </StyledBody>
    </Card>
  );
};

export default ReviewItem;
