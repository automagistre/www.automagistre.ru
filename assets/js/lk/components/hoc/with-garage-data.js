import React from 'react';
import { GarageServiceConsumer } from '../garage-context';

const withGarageData = () => (Wrapped) => {

  return (props) => {
    return (
        <GarageServiceConsumer>
          {
            (garageData) => {
              return (<Wrapped {...props} garageData ={garageData} />);
            }
          }
        </GarageServiceConsumer>
    );
  }
};

export default withGarageData;
