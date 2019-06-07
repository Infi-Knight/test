import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spinner } from 'baseui/spinner';
import { Button, SIZE } from 'baseui/button';
import { Notification, KIND } from 'baseui/notification';

import ReviewGrid from '../ReviewGrid';
import HomeStyles from './Home.module.css';

const POSTS_PER_PAGE = 6;

const FETCH_PUBLISHED_REVIEWS_QUERY = gql`
  query fetchPublishedPosts(
    $input: PostWhereInput!
    $first: Int!
    $skip: Int!
  ) {
    posts(where: $input, orderBy: createdAt_ASC, first: $first, skip: $skip) {
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

const publishedReviewsQueryVars = {
  input: { status: 'PUBLISHED' },
  skip: 0,
  first: POSTS_PER_PAGE,
};

const Home = props => {
  const [areMorePosts, setAreMorePosts] = useState(false);
  return (
    <Query
      query={FETCH_PUBLISHED_REVIEWS_QUERY}
      variables={publishedReviewsQueryVars}
      notifyOnNetworkStatusChange={true}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data, fetchMore, updateQuery }) => {
        if (loading) return <Spinner />;
        if (error) {
          return (
            <Notification
              autoHideDuration={1000}
              closeable
              kind={KIND.negative}
            >
              {`Error! ${error.message}`}
            </Notification>
          );
        }

        const totalPublishedPostsCount = data.postsConnection.edges.filter(
          edge => edge.node.status === 'PUBLISHED'
        ).length;

        setAreMorePosts(
          data.posts.length < totalPublishedPostsCount ? true : false
        );

        return (
          <div className={HomeStyles.HomeContainer}>
            <div className={HomeStyles.LoadMoreButton}>
              {areMorePosts ? (
                <button
                  disabled={!areMorePosts}
                  onClick={() => {
                    return fetchMore({
                      variables: {
                        skip: data.posts.length,
                      },
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                          setAreMorePosts(false);
                          return previousResult;
                        }
                        return Object.assign({}, previousResult, {
                          posts: [
                            ...fetchMoreResult.posts,
                            ...previousResult.posts,
                          ],
                        });
                      },
                    });
                  }}
                >
                  Load more reviews
                </button>
              ) : (
                <button disabled>No more reviews</button>
              )}
            </div>
            <ReviewGrid posts={data.posts} />
          </div>
        );
      }}
    </Query>
  );
};

export default Home;
