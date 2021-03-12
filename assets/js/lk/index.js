import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient} from '@apollo/client';
import cache from './gql/cache';

import App from './components/app/';
import ErrorBoundary from './components/error-boundry';

const GARAGE_SERVER_URL = "http://localhost:4000"

const initGarage = () => {

  const root = document.getElementById('root');
  const apolloClient = new ApolloClient({
    uri: GARAGE_SERVER_URL,
    cache
  })

  if (root) {
    ReactDOM.render(
        <ErrorBoundary>
          <ApolloProvider client={apolloClient}>
              <App/>
          </ApolloProvider>
        </ErrorBoundary>, root);
    }
}

export default initGarage;
