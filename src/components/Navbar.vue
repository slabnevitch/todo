<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Список задач</b-navbar-brand>

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
    <b-navbar-nav v-if="!getUserInfo.isAuthorized" class="ml-auto">
      <b-nav-item v-b-modal.modalSignIn>Войти</b-nav-item>
      <b-nav-item v-b-modal.modalSignUp>Зарегистрироваться</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav v-else class="ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          <b-icon-person-fill></b-icon-person-fill>
          <span class="ml-1">{{getUserInfo.name}}</span>
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
    username: String
  },
  methods: {
    async signOutConfirm(id){
      try{
         const modalConfirm = await this.$bvModal.msgBoxConfirm('Действительно хотите выйти?', {
          okTitle: 'Да',
          cancelTitle: 'Отмена',
         });
       
         console.log(modalConfirm)
         
         if(modalConfirm){
           await this.$store.dispatch('logout')
          }
      }catch(e){
        
      }
        // this.$bvModal.msgBoxConfirm('Действительно хотите выйти?', {
        //     okTitle: 'Да',
        //     cancelTitle: 'Отмена',
        // })
        //   .then(value => {
        //     console.log(value)
        //       if(value){
        //         await this.$store.dispatch('logout')
        //       }
        //   })
        //   .catch(err => {

        //   })
    }
  },
  computed: {
    getUserInfo(){
      return this.$store.getters.getUser
    }
  }
}
</script>

<style scoped lang="scss">
  .router-link-active{
      color: rgba(255, 255, 255, 0.75);
  }
</style>
