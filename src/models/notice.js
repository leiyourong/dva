import { getNotices } from '@/services/notice'

export default {
  namespace: 'notice',
  state: {
    receiveList: []
  },
  reducers: {
    getReceiveNotice (state, action) {
      return {
        ...state,
        receiveList: action.payload.items
      }
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(getNotices)
      yield put({ type: 'getReceiveNotice', payload: res });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log(history)
      // return history.listen(({ pathname }) => {

      // })
    }
  }
}
