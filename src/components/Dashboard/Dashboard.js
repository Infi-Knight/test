import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
          if (networkStatus === 4) return 'Refreshing!';
          if (loading) return null;
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <button onClick={() => refetch()}>Refresh dashboard</button>
              <ReviewGrid posts={admin ? data.posts : data.reviewer.posts} />
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Dashboard;
