import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default{
  state: {
    user: {
      isAuthorized: false,
      uid: null,
      name: ''
    },
    error: null
  },
  mutations: {
  	setUser(state, uid){
      state.user.isAuthorized = true
      state.user.uid = uid
    },
    unsetUser(state){
      state.user.isAuthorized = false
      state.user.uid = null
    },
    setUsername(state, name){
      state.user.name = name
    },
    clearUser(state){
      state.user.name = null
      state.user.uid = null
    },
    setError(state, payload){
      console.log('setError is called')
      state.error = payload
    }
  },
  actions: {
    userStateChange({commit, dispatch}, user){
      if(user){
        commit('setUser', user.uid)
        dispatch('fetchName')
        dispatch('getTasks')
      }else{
        commit('unsetUser')
      }
    },
    async login({commit, dispatch}, {email, password}){
      console.log('async login')
      try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
        // dispatch('fetchName')
      } catch(e){
        commit('setError', e) //commit - Запуск мутации.
        throw e //пробрасываем ошибку дальше из промиса
        // console.error(e)
      }
    },
    async logout({commit}){
      await firebase.auth().signOut()
      commit('clearUser')
    },
    async register({dispatch, commit}, {email,  password, name}){
      console.log(email,  password, name)
      try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')//dispatch - Запуск действия.
        console.log('uid', uid)
        await firebase.database().ref(`users/${uid}`).set({
          name: name,
          tasks: {}
        })//`users/${uid}/info` - путь до базы данных, создаваемой для пользователя 
          console.log('try in register')
          // dispatch('fetchName')
        } catch(e){
          console.log('catch in register')
          // commit('setError', e) //commit - Запуск мутации.
          throw e
        }
    },
    getUserId(){
      const user = firebase.auth().currentUser
      // console.log('userId', user.uid)
      return user ? user.uid : null
    },
    async fetchName(ctx){
      try{
        const uid = await ctx.dispatch('getUserId')
        const info = (await firebase.database().ref(`/users/${uid}/name`).once('value')).val()
        ctx.commit('setUsername', info)

      }catch(e){
        console.log(e)
      }
    }
  },

  getters: {
  	getUser(state){
      return state.user
    },
    getError: (state) => state.error
  }
}
