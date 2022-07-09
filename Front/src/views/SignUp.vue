<script>
import SignUpHeader from '../components/SignUpHeader.vue';
import SignUpMain from '../components/SignUpMain.vue';
import SocialFooter from '../components/SocialFooter.vue';
export default {
    name: "SignUp",
    components: { SignUpHeader, SignUpMain, SocialFooter }
}

</script>

<template>
  <div class="ContainerGrid"> 
    <SignUpHeader></SignUpHeader>
    <SignUpMain></SignUpMain>
    <SocialFooter></SocialFooter>
  </div> 

</template>

<style lang="scss">
@import "../assets/sass/main.scss";  

@include ContainerGrid;

</style>