import React from 'react';
import { ServerDataConsumer } from '../server-context';

const withServerData = (mapMethodsToProps) => (Wrapped) => {

  return (props) => {
    return (
        <ServerDataConsumer>
          {
            (serverData) => {
              const serverProps = mapMethodsToProps(serverData);

              return (
                  <Wrapped {...props} {...serverProps} />
              );
            }
          }
        </ServerDataConsumer>
    );
  }
};

export default withServerData;
