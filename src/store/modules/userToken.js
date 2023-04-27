const state = {
    token: '',
    departNum: 0
}
const actions = {}
const mutations = {
    //改变部门数量
    departNum(state, num) {
        state.departNum = num
    },
    setToken(state, token) {
        state.token = token
    },
    clearToken(state) {
        state.token = ''
    },
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}