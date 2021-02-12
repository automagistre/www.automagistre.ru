import React from 'react';
import { withServerData } from '../hoc'

const Test = (props) => {
  const works = props.getData('dummy_car_uuid_1').map(work => {
    return (
        <div>{work.name} - {work.price.amount}</div>
    )
  })

  return <div>{works}</div>
}

const mapMethodsToProps = (serverData) => {
  return {
    getData: serverData.getWorkByCarID,
  }
};

export default withServerData(mapMethodsToProps)(Test);
