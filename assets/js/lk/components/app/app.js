import React from 'react';
import ContactsBlock from '../contacts-block';
import CarsBlock from '../cars-block/cars-block';
import ActiveCarWorksBlock from '../active-car-works-block';
import ActiveCarRecommendationsBlock
  from '../active-car-recommendations-block/active-car-recommendations-block';

const App = () => {
  return (<div className="garage">
            <ContactsBlock/>
            <CarsBlock/>
            <ActiveCarRecommendationsBlock />
            <ActiveCarWorksBlock/>
          </div>)
}

export default App;
