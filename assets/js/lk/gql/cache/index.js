import {activeCarId, activeCarPolicy} from './activeCarId';
import {InMemoryCache} from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities"

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        activeCarId: activeCarPolicy,
        works: relayStylePagination(["carId"])
      }
    }
  }
})

export default cache

export {
  activeCarId
}
