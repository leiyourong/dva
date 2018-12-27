import { getPrize } from '@/services/lottery'

export default {
  namespace: 'lottery',
  state: {
    prizes: []
  },
  reducers: {
    getPrize (state, action) {
      return {
        ...state,
        prizes: action.payload.items
      }
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(getPrize)
      yield put({ type: 'getPrize', payload: res });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      if (history.location.pathname === '/component/lottery') {
        dispatch({
          type: 'fetch',
        })
      }
    }
  }
}
