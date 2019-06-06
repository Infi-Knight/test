import React from 'react';
import { Button, SIZE } from 'baseui/button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ReviewGrid from '../ReviewGrid';
import HomeStyles from './Home.module.css';

/* TODO: comment out this logger when in production */
// import logQueryResult from '../../utils/dev/logQueryResult';

const POSTS_PER_PAGE = 6;

const Home = props => {
  // logQueryResult(props, 'posts', true); // TODO: comment out  in production
  let {
    data: { loading, error, posts, postsConnection },
    showMoreReviews,
  } = props;

  if (error) {
    return <h1>Error fetching posts!</h1>;
  }

  if (posts && postsConnection) {
    const totalPublishedPosts = postsConnection.edges.filter(
      edge => edge.status === 'PUBLISHED'
    ).length;
    const areMorePosts = posts.length < totalPublishedPosts;

    return (
      <section>
        <div className={HomeStyles.LoadMoreButton}>
          {areMorePosts ? (
            <Button
              size={SIZE.compact}
              disabled={loading}
              onClick={() => showMoreReviews()}
            >
              {loading ? 'Loading...' : 'Load more reviews'}
            </Button>
          ) : (
            <Button disabled>Load more reviews</Button>
          )}
        </div>

        <ReviewGrid className={HomeStyles.ReviewGrid} posts={posts} />
      </section>
    );
  }

  return <h2>Loading posts...</h2>;
};

export const posts = gql`
  query posts($input: PostWhereInput!, $first: Int!, $skip: Int!) {
    posts(where: $input, orderBy: title_ASC, first: $first, skip: $skip) {
      title
      body
      likes
      views
      id
      reviewer {
        username
      }
      image
    }
    postsConnection {
      edges {
        node {
          status
        }
      }
    }
  }
`;

export const postQueryVars = {
  input: { status: 'PUBLISHED' },
  skip: 0,
  first: POSTS_PER_PAGE,
};

export default graphql(posts, {
  options: {
    variables: postQueryVars,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  },
  props: ({ data }) => ({
    data,
    showMoreReviews: () => {
      return data.fetchMore({
        variables: {
          skip: data.posts.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return Object.assign({}, previousResult, {
            posts: [...previousResult.posts, ...fetchMoreResult.posts],
          });
        },
      });
    },
  }),
})(Home);
