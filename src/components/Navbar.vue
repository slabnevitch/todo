<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>Список задач</b-navbar-brand>

    <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <li class="nav-item">
          <router-link to="/create" class="nav-link" exact>Создать задачу</router-link> 
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Список</router-link>
        </li>
      </b-navbar-nav>
    
    </b-collapse> -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-b-modal.modalSignIn>Войти</b-nav-item>
      <b-nav-item v-b-modal.modalSignUp>Зарегистрироваться</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav>
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          <b-icon-person-fill></b-icon-person-fill>
          <span class="ml-1">name</span>
        </template>
        <b-dropdown-item @click="signOutConfirm">Выйти</b-dropdown-item>
      </b-nav-item-dropdown>
      
    </b-navbar-nav>
  </b-navbar>
  

</template>

<script>
export default {
  name: 'Navbar',
  props: {
    userState: Boolean
  },
  methods: {
    signOutConfirm(id){
        this.$bvModal.msgBoxConfirm('Действительно хотите выйти?', {
            okTitle: 'Да',
            cancelTitle: 'Отмена',
        })
          .then(value => {
            console.log(value)
              if(value){
   
              }
          })
          .catch(err => {

          })
    },
  }
}
</script>

<style scoped lang="scss">
  .router-link-active{
      color: rgba(255, 255, 255, 0.75);
  }
</style>
