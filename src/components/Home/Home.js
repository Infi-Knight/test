import React from 'react';
import { Button } from 'baseui/button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

/* TODO: comment out this logger when in production */
import logPostsFetch from '../../utils/dev/logQueryResult';

const POSTS_PER_PAGE = 3;

const Home = props => {
  logPostsFetch(props, 'posts', true); // TODO: comment out  in production

  return (
    <div>
      <Button>A dumb button</Button>
    </div>
  );
};

export const posts = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(orderBy: title_ASC, first: $first, skip: $skip) {
      title
      body
      reviewer {
        username
      }
      image {
        url
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
})(Home);
