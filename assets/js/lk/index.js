import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient} from '@apollo/client';
import cache from './gql/cache';

import App from './components/app/';
import ErrorBoundary from './components/error-boundry';


const initGarage = () => {

  const root = document.getElementById('root');
  const apolloClient = new ApolloClient({
    uri: 'https://localhost',
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
