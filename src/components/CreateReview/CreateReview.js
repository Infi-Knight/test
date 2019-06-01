import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
    <div>
      <h1>Write a review</h1>
      <h4>{error}</h4>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            autoFocus
            placeholder="Title of your post"
            onChange={e => setTitle(e.target.value)}
            type="text"
            id="title"
            value={title}
          />
        </div>

        <div>
          <label>
            Body:
            <textarea
              placeholder="Description"
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            placeholder="Image link"
            id="image"
            onChange={e => setImage(e.target.value)}
            value={image}
          />
        </div>

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
          onCompleted={data => {
            console.log(data);
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
