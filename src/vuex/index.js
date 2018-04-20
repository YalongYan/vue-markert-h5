import Vue from 'vue';
import Vuex from 'vuex';

import base from './modules/base';
import user from './modules/user';
import carPicker from './modules/carPicker';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base,
    user,
    carPicker,
  },
});
