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
  </b-navbar>
</template>

<script>
export default {
  name: 'Navba',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
  .router-link-active{
      color: rgba(255, 255, 255, 0.75);
  }
</style>
