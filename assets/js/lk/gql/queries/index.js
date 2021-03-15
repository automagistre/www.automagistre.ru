import { GET_USER_CONTACTS, UPDATE_USER_CONTACTS } from './contacts'
import { GET_USER_CARS} from './cars';
import GET_WORKS_BY_CAR_ID from './works';
import GET_RECOMMENDATIONS_BY_CAR_ID from './recommendation';
import gql from 'graphql-tag';

const GET_ACTIVE_CAR_ID = gql`
  query {
      activeCarId @client
  }
`

export {
  GET_ACTIVE_CAR_ID,
  GET_USER_CONTACTS,
  UPDATE_USER_CONTACTS,
  GET_USER_CARS,
  GET_WORKS_BY_CAR_ID,
  GET_RECOMMENDATIONS_BY_CAR_ID
}
