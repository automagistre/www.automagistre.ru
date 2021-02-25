import React from 'react';
import withGarageData from '../hoc/with-garage-data';
import ContactsGroup from '../contacts-group';

const App = () => {
  return <ContactsGroup/>
}

export default withGarageData()(App);
