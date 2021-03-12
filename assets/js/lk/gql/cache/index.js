import {activeCarId, activeCarPolicy} from './activeCarId';
import {InMemoryCache} from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        activeCarId: activeCarPolicy
      }
    }
  }
})

export default cache

export {
  activeCarId
}
