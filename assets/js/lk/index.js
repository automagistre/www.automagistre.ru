import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/';

const initGarage = () => {
  const root = document.getElementById('root');

  if (root) {
    ReactDOM.render(<App/>, root);
  }

}

export default initGarage;
