import {activeCarId} from './reactive-vars';
import {InMemoryCache} from '@apollo/client';

const cache = new InMemoryCache()

export default cache

export {
  activeCarId
}
