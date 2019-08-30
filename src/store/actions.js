import * as Types from './mutation-types';

export default {
  temp({ commit }, payload) {
    commit(Types.TEMP, payload);
  },
}
