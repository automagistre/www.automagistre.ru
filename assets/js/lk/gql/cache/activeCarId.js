import { makeVar } from '@apollo/client';

export const activeCarId = makeVar('');
export const activeCarPolicy = {
    read() {
      return activeCarId();
    }
  }
