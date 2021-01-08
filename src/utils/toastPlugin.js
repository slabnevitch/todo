export default{
	install(Vue, options){
		Vue.prototype.$toast = function(taskTitle, action){
			this.$bvToast.toast(`"${taskTitle}"`, {
				title: action + 'задача',
				autoHideDelay: 5000,
				variant: action === 'add' ? "success" : "danger"
			})
		}
	}
}
