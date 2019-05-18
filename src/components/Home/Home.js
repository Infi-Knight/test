import React from 'react';
import { Button } from 'baseui/button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

/* TODO: comment out this logger when in production */
// import logQueryResult from '../../utils/dev/logQueryResult';

const POSTS_PER_PAGE = 2;

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
    const areMorePosts = posts.length < postsConnection.aggregate.count;
    return (
      <section>
        {areMorePosts ? (
          <Button disabled={loading} onClick={() => showMoreReviews()}>
            {loading ? 'Loading...' : 'Load more reviews'}
          </Button>
        ) : (
          <Button disabled>Load more reviews</Button>
        )}

        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <div>
                <h3>Title: {post.title}</h3>
                <p>Review: {post.body}</p>
                <img
                  alt={post.title}
                  src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${
                    post.image.handle
                  }`}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return <h2>Loading posts...</h2>;
};

export const posts = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(orderBy: title_ASC, first: $first, skip: $skip) {
      title
      body
      id
      reviewer {
        username
      }
      image {
        handle
      }
    }
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const postQueryVars = {
  skip: 0,
  first: POSTS_PER_PAGE,
};

export default graphql(posts, {
  options: {
    variables: postQueryVars,
    notifyOnNetworkStatusChange: true,
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
