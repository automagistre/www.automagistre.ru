import { FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_FAILURE } from '../actions-types';

const contactsRequest = () => {
  return {
    type: FETCH_CONTACTS_REQUEST
  }
}

const contactsLoaded = (contacts) => {
  return {
    type: FETCH_CONTACTS_SUCCESS,
    payload: contacts
  }
}

const contactsError = (err) => {
  return {
    type: FETCH_CONTACTS_FAILURE,
    payload: err
  }
}

const fetchContacts = (garageData) => () => (dispatch) => {
  dispatch(contactsRequest());
  garageData.getUser('dummy_user_uuid')
    .then(data => dispatch(contactsLoaded(data)))
      .catch(err => dispatch(contactsError(err)))
}

export {
  fetchContacts
}
