import React from 'react';
import withGarageData from '../hoc/with-garage-data';
import ContactsBlock from '../contacts-block';
import CarsBlock from '../cars-block/cars-block';

const App = () => {
  return (<div>
            <ContactsBlock/>
            <CarsBlock/>
          </div>)
}

export default withGarageData()(App);
