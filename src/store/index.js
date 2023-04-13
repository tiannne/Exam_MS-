import { createStore } from "vuex";
// import userToken from "./mudoles/userToken";
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins:[createPersistedState()],
    state : {
        token:''
      },
      mutations: {
       setToken(state,token){
        state.token = token
       }
      }
})
export default store