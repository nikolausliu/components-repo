import * as types from './mutation-types';

export default {
  [types.TEMP](state, payload) {
    state.temp = payload;
  },
};
