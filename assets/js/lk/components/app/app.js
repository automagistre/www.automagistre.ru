import React from 'react';
import withGarageData from '../hoc/with-garage-data';
import ContactsBlock from '../contacts-block';
import CarsBlock from '../cars-block/cars-block';
import ActiveCarWorksBlock from '../active-car-works-block';

const App = () => {
  return (<div>
            <ContactsBlock/>
            <CarsBlock/>
            <ActiveCarWorksBlock/>
          </div>)
}

export default withGarageData()(App);
