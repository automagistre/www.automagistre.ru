import React from 'react';
import Contacts from './contacts';

import {ErrorIndicator, Loading} from '../server-indicators';
import { useQuery} from '@apollo/client';
import {GET_USER_CONTACTS} from '../../gql/queries';

function ContactsBlock() {
  const {data , loading, error} = useQuery(GET_USER_CONTACTS);

  return (
      <section className="garage__block garage__contacts">
        <h2 className="garage__title">Контактные данные</h2>
        { loading && <Loading/> }
        { error && <ErrorIndicator/> }
        { data && <Contacts user={data?.user} /> }
      </section>
  );
}

export default ContactsBlock;

