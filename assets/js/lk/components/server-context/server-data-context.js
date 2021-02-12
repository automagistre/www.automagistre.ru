import React from 'react';

const {
  Provider: ServerDataProvider,
  Consumer: ServerDataConsumer
} = React.createContext();

export {
  ServerDataConsumer,
  ServerDataProvider
}
