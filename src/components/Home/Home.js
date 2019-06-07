import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spinner } from 'baseui/spinner';
import { Pagination } from 'baseui/pagination';
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
    posts(where: $input, orderBy: createdAt_DESC, first: $first, skip: $skip) {
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
  const [currentPage, setCurrentPage] = useState(1);
  let requiredData;

  return (
    <div>
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
          requiredData = data;

          const totalPublishedPostsCount = data.postsConnection.edges.filter(
            edge => edge.node.status === 'PUBLISHED'
          ).length;

          const numPages = Math.ceil(totalPublishedPostsCount / POSTS_PER_PAGE);

          return (
            <section>
              <Pagination
                overrides={{
                  Root: {
                    style: { width: '300px', margin: '2rem auto', padding: 0 },
                  },
                }}
                numPages={numPages}
                currentPage={currentPage}
                onPageChange={({ nextPage }) => {
                  setCurrentPage(Math.min(Math.max(nextPage, 1), numPages));
                  fetchMore({
                    variables: {
                      skip: data.posts.length,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        requiredData = {
                          posts: previousResult.posts.map(post => post),
                        };
                        return requiredData;
                      } else {
                        requiredData = {
                          posts: fetchMoreResult.posts.map(post => post),
                        };
                        return requiredData;
                      }
                    },
                  });
                }}
              />
              <ReviewGrid
                className={HomeStyles.ReviewGrid}
                posts={requiredData.posts}
              />
            </section>
          );
        }}
      </Query>
    </div>
  );
};

export default Home;
