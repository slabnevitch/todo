import firebase from 'firebase/app';

export default{
  state: {
  	tasks: [],
    tasksPreloader: true
  },
  mutations: {
  	createTask(state, task){
  		// state.tasks.push(task)
    //   localStorage.setItem('tasks', JSON.stringify(state.tasks))

  	},
    setTasks(state, tasks){
      state.tasks = tasks
    },
    setTaskPreloader(state, preloaderState){
      state.tasksPreloader = preloaderState
    }
  },
  actions: {
  	async createTask({commit, dispatch}, task){
      try{
        const uid = await dispatch('getUserId')
          const pushedTask = await firebase.database().ref(`users/${uid}/tasks`).push(task) //если в базе данных нет поля categories оно будет создано
          //firebase вернет категорию, в нем будет поле key
          return pushedTask.key//возвращаем task с выдп=анным 'key', присвоив его полю id

      }catch(e){
        // ctx.commit('setError', e)
        throw e
      }
      // commit('createTask', task)
  	},
    async getTasks(ctx){
      console.log('getTasks action id called')
      try{
        const uid = await ctx.dispatch('getUserId')
        const tasks = (await firebase.database().ref(`/users/${uid}/tasks`).once('value')).val() || {}
        
        ctx.commit('setTasks', Object.keys(tasks).map((key) => ({...tasks[key], id: key})))
        ctx.commit('setTaskPreloader', false)
        // console.log(Object.keys(tasks).map((key) => ({...tasks[key], id: key})))
        // return Object.keys(tasks).map((key) => ({...tasks[key], id: key}))

      }catch(e){
        // ctx.commit('setError', e)
        throw e
      }
    },
    async editTask({dispatch}, payload){

      try{
          const uid = await dispatch('getUserId')
          const updatedTask = await firebase.database().ref(`users/${uid}/tasks`).child(payload.id).update(payload) //обновление полей в категории с переданным id
          dispatch('getTasks')
      }catch(e){
        console.error(e)
        // ctx.commit('setError', e)
        throw e
      }
    },
    async removeTask({dispatch}, payload){
      try{
         const uid = await dispatch('getUserId')
          const removedTask = await firebase.database().ref(`users/${uid}/tasks`).child(payload).remove()
          dispatch('getTasks')

      }catch(e){
        throw e
      } 
    },
    resetPreloaderState({commit}, payload){
      commit('setTaskPreloader', payload)
    }
  },

  getters: {
  	getTasks(state){
      return state.tasks
  	},
    getPreloaderState: (state) => state.tasksPreloader
  }
}
