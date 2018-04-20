import types from '../mutation-types';

const state = {
  // 用户登录状态
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  // 用户登录信息
  token: JSON.parse(localStorage.getItem('token')) || '',
  userInfo: null,
};

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit(types.SET_USER_INFO, userInfo);
  },
  setToken({ commit }, token) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('loginStatus', true);
    commit(types.SET_TOKEN, token);
    commit(types.SET_LOGIN_STATUS, true);
  },
  setSignOut({ commit }) {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('token');
    commit(types.SET_LOGIN_STATUS, false);
    commit(types.SET_TOKEN, {});
  },
};

const getters = {
  loginStatus: state => state.loginStatus,
  token: state => state.token,
  userInfo: state => state.userInfo,
};

const mutations = {
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
