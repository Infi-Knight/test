import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import { Spinner } from 'baseui/spinner';
import { Notification, KIND } from 'baseui/notification';

import ReviewPageStyles from './ReviewPage.module.css';

const FETCH_REVIEW_QUERY = gql`
  query fetchReviewQuery($input: PostWhereUniqueInput!) {
    post(where: $input) {
      title
      body
      image
      likes
      views
      createdAt
      reviewer {
        username
      }
    }
  }
`;

const ReviewPage = ({ match }) => {
  return (
    <React.Fragment>
      <Query
        query={FETCH_REVIEW_QUERY}
        variables={{ input: { id: match.params.id } }}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, networkStatus }) => {
          if (networkStatus === 4) return <Spinner />;
          if (loading) return null;
          if (error)
            return (
              <Notification
                autoHideDuration={1000}
                kind={KIND.negative}
                closeable
              >{`Error! ${error.message}`}</Notification>
            );
          const { title, body, image, reviewer, likes, createdAt } = data.post;
          return (
            <div className={ReviewPageStyles.ReviewContainer}>
              <div className={ReviewPageStyles.Card}>
                <div className={ReviewPageStyles.Aside}>
                  <i
                    className={` fa fa-heart-o fa-2x ${ReviewPageStyles.Like}`}
                  />
                  {likes ? likes : 0}
                </div>
                <div className={ReviewPageStyles.Title}>{title}</div>
                <img
                  className={ReviewPageStyles.Image}
                  alt={title}
                  src={image}
                />
                <div className={ReviewPageStyles.ReviewBody}>
                  <h4 style={{ marginBottom: '2px' }}>{`${
                    reviewer.username
                  }`}</h4>
                  <h5 style={{ margin: '0' }}>{`${dayjs(createdAt).format(
                    ' MMMM D, YYYY'
                  )}`}</h5>
                  <p>{body}</p>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    </React.Fragment>
  );
};
export default ReviewPage;
