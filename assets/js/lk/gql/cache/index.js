import {activeCarId, activeCarPolicy} from './activeCarId';
import {InMemoryCache} from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities"
import {isCheckedPartItem, isCheckedRec} from './fragments';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        activeCarId: activeCarPolicy,
        works: relayStylePagination(["carId"]),
      }
    },
    Recommendation: {
      fields: {
        isChecked: {
          read(status=true) { return status }
        }
      }
    },
    PartItem: {
      fields: {
        isChecked: {
          read(status=true) { return status }
        }
      }
    }
  }
})

export default cache

export {
  activeCarId,
  isCheckedPartItem,
  isCheckedRec
}
