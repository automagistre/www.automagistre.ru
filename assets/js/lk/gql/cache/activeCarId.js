import { makeVar } from '@apollo/client';

export const activeCarId = makeVar(undefined);
export const activeCarPolicy = {
    read() {
      return activeCarId();
    }
  }
