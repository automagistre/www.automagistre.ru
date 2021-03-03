import contactBlockReducer from './contacts';
import {carsBlockReducer, changeActiveCarReducer} from './cars';
import {userUuid} from '../dummy-server-data'
import {worksActiveCarReducer} from './active-car';

const USER_ID = userUuid

const rootReducer = (state, action) => {
  return {
    userId: USER_ID,
    userContacts: contactBlockReducer(state, action),
    userCars: carsBlockReducer(state, action),
    activeCarId: changeActiveCarReducer(state, action),
    activeCarWorks: worksActiveCarReducer(state, action)
  }
}

export default rootReducer
