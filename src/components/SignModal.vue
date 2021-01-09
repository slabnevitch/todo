<template>
	<b-modal id="modalSignIn" title="Вход в аккаунт">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <!-- <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Имя"
          required
        ></b-form-input>
      </b-form-group> -->

      <b-form-group id="input-group-3" label="Пароль:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>

      <!-- <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
     <template #modal-footer="{ ok, cancel, hide }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="onSubmit">
        Войти
      </b-button>
      <b-button size="sm" variant="danger" @click="cancel()">
        Отмена
      </b-button>
      <!-- Button with custom close trigger value -->
    </template>
  </b-modal>
</template>

<script>
	export default {
		data(){
			return {
				form: {
          email: '',
          name: '',
          password: '',
        },
			}
		},
		methods: {
      onSubmit(event) {
        event.preventDefault()
        
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.password = ''
        this.form.checked = []
    
      }
    }
	}
</script>