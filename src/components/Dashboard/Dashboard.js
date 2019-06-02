import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import AuthContext from '../Auth';
import ReviewGrid from '../ReviewGrid';
import { posts, postQueryVars } from '../Home/Home';

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

const Dashboard = () => {
  const { authenticated, scope } = useContext(AuthContext);
  const admin = scope === 'admin' ? true : false;
  return (
    <div>
      <Query
        query={admin ? posts : FETCH_REVIEWER_POSTS_QUERY}
        variables={admin ? postQueryVars : { input: { id: authenticated } }}
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
