import firebase from 'firebase/app';

export default{
  state: {
  	tasks: JSON.parse(localStorage.getItem('tasks')) || []
  },
  mutations: {
  	createTask(state, task){
  		// state.tasks.push(task)
    //   localStorage.setItem('tasks', JSON.stringify(state.tasks))

  	},
    editTask(state, newTask){
      // const newTasksArray = state.tasks.concat()
      // let editableTaskIndex = newTasksArray.findIndex(t => t.id === newTask.id)

      // newTasksArray[editableTaskIndex] = newTask
      // console.log(editableTaskIndex)
      // state.tasks = newTasksArray
      // localStorage.setItem('tasks', JSON.stringify(newTasksArray))
      let editableTaskIndex = state.tasks.findIndex(t => t.id === newTask.id)

      state.tasks[editableTaskIndex] = newTask
      // console.log(editableTask)
      
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    removeTask(state, removedTaskId){
      state.tasks.splice(state.tasks.findIndex(t => t.id === removedTaskId), 1)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
  	async createTask({commit, dispatch}, task){
      try{
        const uid = await dispatch('getUserId')
          const pushedTask = await firebase.database().ref(`users/${uid}/tasks`).push(task) //если в базе данных нет поля categories оно будет создано
          //firebase вернет категорию, в нем будет поле key
          console.log(pushedTask.key)
          return pushedTask.key//возвращаем категорию с выдп=анным 'key', присвоив его полю id

      }catch(e){
        // ctx.commit('setError', e)
        console.log(e)
        throw e
      }
      // commit('createTask', task)
  	},
    editTask({commit}, payload){
      commit('editTask', payload)
    },
    removeTask({commit}, payload){
      console.log(payload)
      commit('removeTask', payload)
    }
  },

  getters: {
  	getTasks(state){
      return state.tasks
  	}
  }
}
