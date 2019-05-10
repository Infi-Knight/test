import React from 'react';
import { toaster, ToasterContainer, PLACEMENT } from 'baseui/toast';
import { Button } from 'baseui/button';

class ToasterExample extends React.Component {
  add = () => {
    toaster.info('WIP, stay tuned😁', {
      autoHideDuration: 5000,
    });
  };

  render() {
    return <Button onClick={this.add}>Progress ?</Button>;
  }
}

const Home = () => (
  <React.Fragment>
    <ToasterContainer placement={PLACEMENT.bottomRight} />
    <ToasterExample />
  </React.Fragment>
);

export default Home;
