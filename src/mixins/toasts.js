export default {
	methods: {
		makeToast(taskTitle, method) {
			let variant = method === 'add' ?  "success" : 
				method === 'remove' ? "danger" :
				method === 'finish' ? "secondary" :
				method === 'edit' ? "warning" : null ;

			let title =  method === 'add' ?  "Добавлена" : 
				method === 'remove' ? "Удалена" : 
				method === 'finish' ? "Завершена" : 
				method === 'edit' ? "Изменена" : null;
	        
	        this.$root.$bvToast.toast(`"${taskTitle}"`, {
	          title: title + ' задача',
	          autoHideDelay: 5000,
	          appendToast: false,
	          variant: variant
	          // 'body-class': 'toast-body'
	        })
      	}
	}
}