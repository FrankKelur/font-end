let delay = ms => new Promise((resolve, reject) => {
    setTimeout(() => resolve('ok'), ms)
})

export default {
    namespace: 'count',
    state: {
        current: 0
    },
    reducers: {
        add(state, action) {
            console.log('add');
            let newCurrent = state.current + 1
            return { current: newCurrent }
        },
        minus(state, action) {
            console.log('state, action: ', state, action);
            let newCurrent = state.current - 1
            return { current: newCurrent }
        }
    },
    // 副作用
    effects: {
        // call调用一个方法，put派发一个action
        *add(action, { call, put }) {
            console.log('*add');
            yield call(delay, 1000)
            yield put({ type: 'minus' })
        }
    }
}