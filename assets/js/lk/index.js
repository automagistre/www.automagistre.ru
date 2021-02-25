import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/';
import ErrorBoundary from './components/error-boundry';
import { GarageServiceProvider } from './components/garage-context'
import store from './store';
import DummyServerData from './dummy-server-data';

const initGarage = () => {
  const root = document.getElementById('root');
  const garageService = new DummyServerData()

  if (root) {
    ReactDOM.render(
        <Provider store={store}>
          <ErrorBoundary>
            <GarageServiceProvider value={garageService}>
              <App/>
            </GarageServiceProvider>
          </ErrorBoundary>
        </Provider>, root);
  }
}

export default initGarage;
