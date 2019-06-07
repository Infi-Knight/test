import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spinner } from 'baseui/spinner';
import { Notification, KIND } from 'baseui/notification';

import DashboardStyles from './Dashboard.module.css';
import AuthContext from '../Auth';
import ReviewGrid from '../ReviewGrid';

const FETCH_REVIEWER_POSTS_QUERY = gql`
  query fetchReviewerPostsQuery($input: ReviewerWhereUniqueInput!) {
    reviewer(where: $input) {
      username
      posts {
        title
        body
        id
        image
      }
    }
  }
`;

const FETCH_ALL_POSTS_QUERY = gql`
  query fetchAllPostsQuery {
    posts {
      title
      id
      body
      image
      reviewer {
        username
      }
    }
  }
`;

const Dashboard = () => {
  const { authenticated, scope } = useContext(AuthContext);
  const admin = scope === 'admin' ? true : false;
  return (
    <div>
      <Query
        query={admin ? FETCH_ALL_POSTS_QUERY : FETCH_REVIEWER_POSTS_QUERY}
        variables={admin ? {} : { input: { id: authenticated } }}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch, networkStatus }) => {
          if (networkStatus === 4) return <Spinner />;
          if (loading) return null;
          if (error)
            return (
              <Notification kind={KIND.negative} closeable>{`Error! ${
                error.message
              }`}</Notification>
            );
          return (
            <div className={DashboardStyles.DashboardContainer}>
              <button
                className={DashboardStyles.RefreshButton}
                onClick={() => refetch()}
              >
                Refresh dashboard
              </button>
              <ReviewGrid
                onDashboard={true}
                posts={admin ? data.posts : data.reviewer.posts}
              />
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Dashboard;
