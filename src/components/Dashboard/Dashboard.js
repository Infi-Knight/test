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

const Dashboard = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <div>
      <Query
        query={FETCH_REVIEWER_POSTS_QUERY}
        variables={{ input: { id: authenticated } }}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch, networkStatus }) => {
          // refetch();
          if (networkStatus === 4) return 'Refreshing!';
          if (loading) return null;
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <button onClick={() => refetch()}>Refresh dashboard</button>
              <ReviewGrid posts={data.reviewer.posts} />
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Dashboard;
