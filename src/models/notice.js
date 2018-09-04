export default {
  namespace: 'notice',
  state: {
    receiveList: []
  },
  reducers: {
    getReceiveNotice (state, action) {
      console.log(action)
    }
  }
}
