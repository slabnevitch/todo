<template>
  <div class="row">
  	<div class="col-12">
  		<b-jumbotron :header="currentTask[0].title" :lead="currentTask[0].description">
   			<h4>Состояние <b-badge :variant="taskStatusMessages[currentTask[0].status].selector">{{taskStatusMessages[currentTask[0].status].name}}</b-badge></h4>
  		</b-jumbotron>
  	</div>
	   <div class="col-md-6">
	  		<form action="#" @submit.prevent="submit">
		  	 <b-form-group
			  	 label="Название задачи"
			  	 label-for="input-formatter"
		  	 >
				  	 <b-form-input
					  	 id="input-formatter"
					  	 :state="nameState"
					  	 v-model="title"
					  	 placeholder="Например, Купить газету"
				  	 ></b-form-input>
			  	 	
			  	 	<b-form-invalid-feedback id="input-formatter-feedback">Пожалуйста, введите название задачи</b-form-invalid-feedback>
			  	</b-form-group>

			  	 <b-form-group
			      label="Описание задачи"
			    >
			      <b-form-textarea
			        id="textarea-formatter"
			        v-model="description"
			        placeholder="Например, Газетный киоск открывается в 8:00"
			      ></b-form-textarea>
			    </b-form-group>
			    <div>
				    <label for="tags-basic">Тэги</label>
				    <b-form-tags input-id="tags-basic" v-model="tags" placeholder="Тэги, характеризующие задачу"></b-form-tags>
			  	</div>

			  	<div class="mt-3">
			  		<label for="example-datepicker">Укажите дату окончания задачи</label>
			  		<b-form-datepicker id="example-datepicker" :date-disabled-fn="dateDisabled" v-model="deadline" class="mb-2" placeholder="Дата не выбрана"></b-form-datepicker>
			  	</div>
	  			<b-button :disabled="isCompleted" type="button" variant="danger" class="mr-2" @click.prevent="complete">Завершит задачу</b-button>
	  			
	  			<Loader :busy="busy">
	  				<b-button v-show="!isCompleted && !isEdited" type="submit" variant="success">Сохранить изменения</b-button>
	  			</Loader>
	  			
	  			<b-button @click.prevent="$router.push('/')" class="ml-2">Отмена</b-button>
	  		</form>
	    </div> <!-- col-6 -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/Navbar.vue'
import  taskStatusMessages from '@/utils/status'
import toastsMixin from '@/mixins/toasts'
import Loader from '@/components/Loader'

export default {
	name: 'Task',
	data() {
		return {
			title: '',
			description: '',
			tags: [],
			deadline: '',
			status: '',
			taskStatusMessages,
			id: '',
			busy: false
		}
	},
	components: {
		Loader
	},
	methods: {
		async submit(){
			let task = {
				title: this.title,
				description: this.description,
				id: this.currentTask[0].id,
				status: this.status,
				tags: this.tags,
				date: this.deadline
			}

	  		if(this.titleValidate()){
	  			this.busy = true
	    		await this.$store.dispatch('editTask', task)
	  			this.busy = false
	  			
	    		this.$router.push('/')
	    		
	    		if(task.status !== 'completed')
	    			this.makeToast(task.title, 'edit')
	  		}
    	},
		complete(){
			if(this.titleValidate()){
	    		this.status='completed';
	    		this.submit();
	    		this.makeToast(this.title, 'finish')
			}
		},
	  dateDisabled(ymd, date) {
	    return date < new Date()
      },
      titleValidate(){
      	return this.nameState
      }  
    },
    created(){
    	this.title = this.currentTask[0].title
			this.description = this.currentTask[0].description
			this.tags = this.currentTask[0].tags || []
			this.deadline = this.currentTask[0].date
			this.status = this.currentTask[0].status
			// this.id = this.currentTask[0].id
    },
    computed: {
    	currentTask(){
	    	 return this.$store.getters.getTasks.filter( t => t.id === this.$route.params.id)
	    	 .map(t => {
	    	  	return {
	    	  		...t,
	    	  		tags: !t.tags ? [] : t.tags,
	    	  		status: new Date(t.date) > new Date() && t.status !== 'completed' ? 'active' :
	    	  		t.status === 'completed' ? 'completed' : 'outdated'
	    	  	}
    	  	});
    	},

    	isCompleted(){
    		return this.status === 'completed'
    	},
    	isEdited(){
    		return this.title === this.currentTask[0].title
				&& this.description === this.currentTask[0].description
				&& this.tags === this.currentTask[0].tags
				&& this.deadline === this.currentTask[0].date
				&& this.status === this.currentTask[0].status
    	},
    	nameState() {
        	return this.title.length > 0 ? true : false
      	}
    },
    mixins: [toastsMixin]
  }
</script>

<style scoped>
	.badge{
		font-size: 1.2em;
	}
	.jumbotron{
		padding: 1rem 2rem;
	}
</style>