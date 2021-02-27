import { FETCH_CONTACTS_SUCCESS,
         FETCH_CONTACTS_REQUEST,
         FETCH_CONTACTS_FAILURE } from '../actions-types';

const initState = {
  user: {
    name: '',
    surname: '',
    mobilePhone: null,
    officePhone: null,
    email: null,
  },
  loading: true,
  error: false

}

const contactBlockReducer = (state, action) => {

  if (state === undefined) {
    return { ...initState }
  }

  switch (action.type) {
    case FETCH_CONTACTS_REQUEST:
      return {
        ...initState
      };
    case FETCH_CONTACTS_SUCCESS:
      return {
        user: {...action.payload},
        loading: false,
        error: false
      };
    case FETCH_CONTACTS_FAILURE:
      return {
        ...initState,
        loading: false,
        error: true
      }
    default:
      return state.userContacts
  }
}

export default contactBlockReducer
