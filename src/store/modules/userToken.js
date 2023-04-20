const state = {
    token: ''
}
const actions = {}
const mutations = {
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