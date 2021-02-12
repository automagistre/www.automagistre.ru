import React, {Component} from 'react';
import DummyServerData from '../../dummy-server-data';
import { ServerDataProvider } from '../server-context';

import Test from '../test';

class App extends Component{

  state = {
    serverData: new DummyServerData(),
    isLoaded: true
  }

  render () {
    return (
        <ServerDataProvider value={this.state.serverData}>
          <Test/>
        </ServerDataProvider>
    )
  }
}

export default App;
