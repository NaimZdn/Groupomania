<script>
import LoginHeader from '../components/LoginHeader.vue';
import LoginMain from '../components/LoginMain.vue';
import SocialFooter from '../components/SocialFooter.vue';

export default {
    name: "Login",
    components: { LoginHeader, LoginMain, SocialFooter }
}
</script>

<template >
  <div class="ContainerGrid"> 
    <LoginHeader></LoginHeader>
    <LoginMain></LoginMain>
    <SocialFooter></SocialFooter>
  </div>

</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

@include ContainerGrid

</style>