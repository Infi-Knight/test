import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const FETCH_REVIEW_QUERY = gql`
  query fetchReviewQuery($input: PostWhereUniqueInput!) {
    post(where: $input) {
      title
      body
      image
      likes
      views
      reviewer {
        username
      }
    }
  }
`;

const ReviewPage = ({ match }) => {
  return (
    <div>
      <Query
        query={FETCH_REVIEW_QUERY}
        variables={{ input: { id: match.params.id } }}
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data, networkStatus }) => {
          if (networkStatus === 4) return 'Refreshing!';
          if (loading) return null;
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <img alt={data.post.title} src={data.post.image} />
              <p>Title: {data.post.title}</p>
              <p>Body: {data.post.body}</p>
              <p>Review by: {data.post.reviewer.username}</p>
              <p>Likes: {data.post.likes}</p>
              <p>Views: {data.post.views}</p>
            </div>
          );
        }}
      </Query>
    </div>
  );
};
export default ReviewPage;
