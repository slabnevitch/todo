import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default{
  state: {
    user: {
      isAuthorized: false,
      uid: null
    }
  },
  mutations: {
  	setUser(state, uid){
      state.user.isAuthorized = true
      state.user.uid = uid
    },
    unsetUser(state){
      state.user.isAuthorized = false
      state.user.uid = null
    }
  },
  actions: {
    userStateChange({commit}, user){
      if(user){
        commit('setUser', user.uid)
      }else{
        commit('unsetUser')
      }
    }
  },

  getters: {
  	getAuthentificated(state){
      return state.user.isAuthorized
    }
  }
}
