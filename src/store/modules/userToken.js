const state = {
    token: ''
}
const actions = {}
const mutations = {
    setToken(state, token) {
        state.token = token
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}