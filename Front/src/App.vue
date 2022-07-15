<script>
import ProfilTabsVue from './components/ProfilTabs.vue';
import Login from './views/Login.vue';

export default {
  name: 'App', 
  components: {
    Login,
    ProfilTabsVue
  }
}



</script>

<template>
<router-view></router-view>
</template>