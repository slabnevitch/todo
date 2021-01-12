<template>
	<b-modal id="modalSignIn" title="Регистрация" hide-footer>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          
          :state="emailState"
        ></b-form-input>
        <b-form-invalid-feedback id="email-feedback">
		      Введите корректный e-mail
		    </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-3" label="Пароль:" label-for="password">
        <b-form-input
          id="password"
          type="password"
          v-model="form.password"
          :state="passState"
        ></b-form-input>
        <b-form-invalid-feedback id="password-feedback">
		      Пароль должен содержать не менее 6 символов
		    </b-form-invalid-feedback>
      </b-form-group>

      <Loader :busy="busy">
        <b-button type="submit" size="sm" variant="success">Войти</b-button>
      </Loader>
      <b-button class="ml-2" size="sm" variant="secondary" @click="cancelModal">Отмена</b-button>

    </b-form>
  </b-modal>
</template>

<script>
	import Loader from '@/components/Loader'

  export default {
		data(){
			return {
				form: {
          email: '',
          password: '',
        },
        busy: false
			}
		},
    components: {
      Loader
    },
		methods: {
      async onSubmit(event) {
        event.preventDefault()
        console.log('submit')

      	const user = {
      		email: this.form.email,
      		password: this.form.password
      	}

        if(this.passState && this.emailState){
          this.busy = true
          var loginResult = await this.$store.dispatch('login', user)
          console.log(loginResult)
        }

        console.log(user)
        this.busy = false

        this.form.email = ''
        this.form.password = ''
        
        this.$bvModal.hide('modalSignIn')
      },
      validateEmail(email) {
			    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    return re.test(String(email).toLowerCase());
			},
    	cancelModal(){
    		this.$bvModal.hide('modalSignIn')
    	}
    },
    computed: {
    	passState(){
    		return this.form.password.length >= 6
    	},
    	emailState(){
    		return this.validateEmail(this.form.email)
    	}

    }
	}
</script>