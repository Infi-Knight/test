import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FormControl } from 'baseui/form-control';
import { StatefulInput, SIZE } from 'baseui/input';
import { StatefulTextarea as Textarea } from 'baseui/textarea';
import { Notification, KIND } from 'baseui/notification';

import CreateReviewStyles from './CreateReview.module.css';
import AuthContext from '../Auth';
const CREATE_POST_MUTATION = gql`
  mutation createPostMutation($input: PostCreateInput!) {
    createPost(data: $input) {
      title
      body
      image
      reviewer {
        username
      }
    }
  }
`;

const CreateReview = props => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const { authenticated } = useContext(AuthContext);

  const _validatePostSubmission = createPostMutation => {
    if (!title || !body || !image) {
      setError('Invalid input');
    } else {
      createPostMutation();
    }
  };

  const _handleGraphQlError = e => {
    setError('Unable to create the review.');
    setTitle('');
    setBody('');
    setImage('');
  };

  return (
    <div className={CreateReviewStyles.CreateReviewContainer}>
      {error && (
        <Notification autoHideDuration={1000} closeable kind={KIND.negative}>
          {error}
        </Notification>
      )}
      <form>
        <FormControl label="Title">
          <StatefulInput
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            size={SIZE.compact}
          />
        </FormControl>

        <FormControl label="Description">
          <Textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            size={SIZE.compact}
          />
        </FormControl>

        <FormControl label="Image">
          <StatefulInput
            type="text"
            placeholder="Link to the image"
            onChange={e => setImage(e.target.value)}
            value={image}
            size={SIZE.compact}
          />
        </FormControl>

        <Mutation
          mutation={CREATE_POST_MUTATION}
          variables={{
            input: {
              title: title,
              body: body,
              image: image,
              status: 'DRAFT',
              reviewer: {
                connect: { id: authenticated },
              },
            },
          }}
          onError={e => _handleGraphQlError(e)}
          onCompleted={() => {
            props.history.push('/dashboard');
          }}
        >
          {createPostMutation => (
            <button
              type="submit"
              onClick={e => {
                e.preventDefault();
                _validatePostSubmission(createPostMutation);
              }}
            >
              Create Post
            </button>
          )}
        </Mutation>
      </form>
    </div>
  );
};

export default CreateReview;
