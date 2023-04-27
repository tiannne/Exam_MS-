import { createStore } from "vuex"
import userToken from "./modules/userToken.js"
import createPersistedState from 'vuex-persistedstate'


const store = createStore({
  modules: {
    userToken
  },
  plugins: [createPersistedState({
    paths: ['userToken.token','userToken.departNum']
  })],
})
export default store