export default{
  state: {
  	tasks: JSON.parse(localStorage.getItem('tasks')) || []
  },
  mutations: {
  	createTask(state, task){
  		state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
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
  	createTask({commit}, task){
      commit('createTask', task)
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
