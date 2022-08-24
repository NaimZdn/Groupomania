<template>
    <MainHeader></MainHeader>

    <main class="container-flex">
        <section class="Profil">   
            <ProfilInformation/>
            <ProfilTabs/>
        </section>

    </main>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import ProfilTabs from '../components/ProfilTabs.vue';
import ProfilInformation from '../components/ProfilInformation.vue';
import { mapState } from 'vuex';
export default {
    name: "UserProfil",
    components: { MainHeader, ProfilTabs, ProfilInformation },

    mounted () {
    if (this.user.userId === ''){
      this.$router.push('/')
    }
    }, 
    computed : {
        ...mapState ({
            user: 'user'
        })
    }
}

</script>




<style lang="scss">
@import "../assets/sass/main.scss"; 

@include ContainerFlex;

.Profil {
    margin-top: 120px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 3px 8px rgb(154, 57, 38, 40%);
    max-width: 748px;
    width: 100%;
    
}
</style>