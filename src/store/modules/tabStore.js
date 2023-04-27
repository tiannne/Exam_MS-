import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '123456',
    openedTab: ['首页','home'],
    activeTab: '',
  },
  mutations: {
    //将name参数加入到openedTab数组中
    addNameTab(state, name){
      state.openedTab.push(name)
    },
    //将componentName参数加入到openedTab数组中
    addTab (state, componentName) {
      // 传递参数
      state.openedTab.push(componentName)
    },
    changeTab (state, componentName) {
      state.activeTab = componentName
    },
    deductTab (state, componentName) {
      let index = state.openedTab.indexOf(componentName)
      let indextwo = index-1;
      state.openedTab.splice(index, 1)
      //删除一次后，数组减少一。所以删除一样的位置，就能删除前面的那个
      state.openedTab.splice(indextwo, 1)
    }
  }
})

