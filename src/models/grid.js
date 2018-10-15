import {getPopularList} from "services/grid";

export default {
  namespace: 'grid',

  state: {
    loading: false,
    list: [],
  },

  reducers: {
    initSuccess(state, {payload}) {
      return {...state, ...payload, loading: false};
    },
    initStart(state) {
      return {...state, loading: true};
    }
  },

  effects: {
    * init({payload}, {put, call}) {
      yield put({type: 'initStart'});
      const list = yield call(getPopularList, payload);
      yield put({
        type: 'initSuccess',
        payload: {
          list: list,
        }
      });
    },
  },
  subscriptions: {},
};
