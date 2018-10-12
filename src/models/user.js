import {getPopularList} from "../services/grid";
import {push} from 'react-router-redux';
import {userLogin, userLogout} from "../services/user";

export default {
  namespace: 'user',

  state: {
    loading: false,
    isLogin: false,
    error: "",
  },

  reducers: {
    loginSuccess(state, {payload}) {
      return {...state, ...payload, isLogin: true, error:"", loading: false};
    },

    loginFailed(state, {payload}) {
      return {...state, ...payload, error: payload.msg, loading: false};
    },
    loginStart(state) {
      return {...state, loading: true};
    },

    logoutSuccess(state, {payload}) {
      return {...state, ...payload, isLogin: false, loading: false};
    },
    logoutStart(state, {payload}) {
      return {...state, ...payload, loading: false};
    },
  },

  effects: {
    * login({payload}, {put, call}) {
      yield put({type: 'loginStart'});
      const result = yield call(userLogin, payload);
      if (result.code === 0) {
        yield put({type: 'loginSuccess'});
        yield put(push("/"));
      } else {
        yield put({type: 'loginFailed', payload: {msg: result.msg}})
      }
    },

    * logout({payload}, {put, call}) {
      yield put({type: 'logoutStart'});
      const result = yield call(userLogout, payload);
      if (result.code === 0) {
        yield put({type: 'logoutSuccess'});
        yield put(push("/"));
      }
    },
  },
  subscriptions: {},
};
