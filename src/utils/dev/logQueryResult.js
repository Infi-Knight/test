/* eslint-disable */

/**
 * Logs the results of a grqphql query fetch.
 *
 * @param {object} props
 * @param {string} queryName Name of the query e.g 'posts'
 * @param {boolean} [false] Log complete json data fetched from graphql query
 */
const logQueryResult = (props, queryName, logCompleteResult = false) => {
  if (logCompleteResult) {
    console.log(props.data);
  }

  if (!props.data.loading) {
    console.log(`Error: ${props.data.error}`);

    // Actual data returned by GraphQL API
    console.log('********** Data **********: ');
    console.log(
      '---> Query variables: ' + JSON.stringify(props.data.variables)
    );

    console.log('---> Items fetched:');

    try {
      let queriedItems = props.data[queryName];
      queriedItems.forEach(item => {
        console.log(item);
      });
    } catch (error) {
      console.log('An error occurred');
    }
  }
};

export default logQueryResult;
