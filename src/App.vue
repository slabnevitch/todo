<template>
  <div id="app">
    <Navbar :userState="getUserState"></Navbar>
    <b-container>
      <router-view/>
    </b-container>
    <SignUpModal></SignUpModal>
    <SignInModal></SignInModal>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import SignUpModal from '@/components/SignUpModal'
  import SignInModal from '@/components/SignInModal'
  export default {
    components: {
      Navbar,
      SignUpModal,
      SignInModal,
    },
    computed: {
      getUserState(){
        return this.$store.getters.getAuthentificated
      }
    }
  }
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss';
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
h1{
  margin-top: 30px;
}
</style>
