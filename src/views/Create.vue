<template>
  <div class="row">
  	<div class="col-12">
  	 <h1>Новая задача</h1>
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
            :state="description.length <= 2048"
		        placeholder="Например, Газетный киоск открывается в 8:00"
		      ></b-form-textarea>
          <div class="d-flex justify-content-end" align-v="end"><span>{{description.length}}/{{descriptionMaxLength}}</span></div>
          <b-form-invalid-feedback id="textarea-formatter-feedback">Длина описания не должна превышать {{descriptionMaxLength}} символов</b-form-invalid-feedback>
		    </b-form-group>
		    <div>
			    <label for="tags-basic">Тэги</label>
			    <b-form-tags input-id="tags-basic" v-model="tags" placeholder="Тэги, характеризующие задачу"></b-form-tags>
		  	</div>

		  	<div class="mt-3">
		  		<label for="example-datepicker">Укажите дату окончания задачи</label>
		  		<b-form-datepicker id="example-datepicker" :state="dateValidation" locale="ru-RU" :date-disabled-fn="dateDisabled" v-model="deadline" class="mb-2" placeholder="Дата не выбрана"></b-form-datepicker>
		  		<b-form-invalid-feedback id="example-datepicker-feedback">Необходимо указать дату окончания</b-form-invalid-feedback>
		  		<!-- <p>Value: '{{ deadline }}'</p> -->
		  	</div>

        <Loader :busy="busy">
  			 <b-button type="submit" variant="success" class="mt-3">Создать Задачу</b-button>
        </Loader>

        <b-button to="/" type="button" variant="secondary" class="mt-3 ml-3">Отмена</b-button>
  		</form>
    </div> <!-- col-6 -->
  </div>
</template>

<script>
// @ is an alias to /src
import toastsMixin from '@/mixins/toasts'
import Loader from '@/components/Loader'

export default {
  name: 'Create',
   data() {
      return {
        title: '',
        description: '',
        tags: [],
        deadline: '',
        descriptionMaxLength: 2048,
        busy: false
      }
    },
    components: {
      Loader
    },
    computed: {
    	 nameState() {
        return this.title.length > 0 ? true : false
      },
      dateValidation(){
      	return this.deadline !== '' ? true : false
      },
      descriptionValid(){
        return this.description.length <= this.descriptionMaxLength 
      }
    },
    methods: {
    	async submit(){
    		let task = {
    			title: this.title,
    			description: this.description,
    			id: +new Date(),
    			status: +new Date(this.deadline) > +new Date() ? 'active' : 'outdated',
    			tags: this.tags,
    			date: this.deadline
    		}
    		if(this.nameState && this.dateValidation && this.descriptionValid){
          this.busy = true
	    		await this.$store.dispatch('createTask', task)
	    		this.busy = false

          this.$router.push('/')
          this.makeToast(this.title, 'add')
    		}
    	},
    	dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()

    		// console.log(date, day, weekday)
        // Return `true` if the date should be disabled
        return date < new Date()
      }
      // makeToast(append = false) {
      //   this.$root.$bvToast.toast(`"${this.title}"`, {
      //     title: 'Добавлена задача',
      //     autoHideDelay: 5000,
      //     appendToast: append,
      //     variant: "success"
      //     // 'body-class': 'toast-body'
      //   })
      // }
    },
    mixins: [toastsMixin]
  // components: {
  //   HelloWorld
  // }
}
</script>
<style>
  .toast-body{
    font-size: 24px;
  }
</style>