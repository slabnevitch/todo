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
    },
    async login({commit}, {email, password}){
      console.log('async login')
      try{
        await firebase.auth().signInWithEmailAndPassword(email, password)

      } catch(e){
        // commit('setError', e) //commit - Запуск мутации.
        throw e //пробрасываем ошибку дальше из промиса
        // console.error(e)
      }
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
  },

  getters: {
  	getAuthentificated(state){
      return state.user.isAuthorized
    }
  }
}
