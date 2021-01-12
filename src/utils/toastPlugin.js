export default{
	install(Vue, options){
		Vue.prototype.$errorToast = function(title){
			this.$root.$bvToast.toast(`${title}`, {
				title: "Ошибка!",
				autoHideDelay: 5000,
				variant: "danger"
			})
		}
		Vue.prototype.$messageToast = function(title){
			this.$root.$bvToast.toast(`${title}`, {
				title: "Сообщение!",
				autoHideDelay: 5000,
				variant: "success"
			})
		}
	}
}
