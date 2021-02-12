import React, {Component} from 'react';
import DummyServerData from '../../dummy-server-data';
import { ServerDataProvider } from '../server-context';

import {LeftColumn, RightColumn} from '../columns';

class App extends Component{

  state = {
    serverData: new DummyServerData(),
    isLoaded: true
  }

  render () {
    return (
        <ServerDataProvider value={this.state.serverData}>
          <LeftColumn/>
          <RightColumn/>
        </ServerDataProvider>
    )
  }
}

export default App;
