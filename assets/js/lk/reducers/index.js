import contactsGroupReducer from './contacts';

const rootReducer = (state, action) => {
  return {
    userContacts: contactsGroupReducer(state, action)
  }
}

export default rootReducer
