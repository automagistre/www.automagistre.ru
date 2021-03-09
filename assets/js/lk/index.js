import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  makeVar,
} from '@apollo/client';

import App from './components/app/';
import ErrorBoundary from './components/error-boundry';
import { GarageServiceProvider } from './components/garage-context'
import store from './store';
import DummyServerData from './dummy-server-data';

export const activeCarId = makeVar('')

const initGarage = () => {

  const root = document.getElementById('root');
  const garageService = new DummyServerData()
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          activeCarId: {
            read() {
              return activeCarId();
            }
          }
        }
      }
    }
  })
  const apolloClient = new ApolloClient({
    uri: 'https://localhost',
    cache})

  if (root) {
    ReactDOM.render(
      <Provider store={store}>
        <ErrorBoundary>
          <ApolloProvider client={apolloClient}>
            <GarageServiceProvider value={garageService}>
              <App/>
            </GarageServiceProvider>
          </ApolloProvider>
        </ErrorBoundary>
      </Provider>, root);
    }
}

export default initGarage;
