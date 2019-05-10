import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

import AppRouter from './components/AppRouter';

const engine = new Styletron();

const App = () => (
  <StyletronProvider value={engine}>
    <React.Fragment>
      <AppRouter />
    </React.Fragment>
  </StyletronProvider>
);

export default App;
