<script>
import MainHeader from '../components/MainHeader.vue';
import ProfilInformation from '../components/ProfilInformation.vue';
import ProfilTabs from '../components/ProfilTabs.vue';
import ProfilInformationDelete from '../components/ProfilInformationDelete.vue';
export default {
    name: "UserProfil",
    components: { MainHeader, ProfilInformation, ProfilTabs, ProfilInformationDelete }
}

</script>

<template>
    
    <MainHeader></MainHeader>
    

    <main class="container-flex">
        <section class="Profil">
            <ProfilInformation></ProfilInformation>
            <ProfilInformationDelete/>
            <ProfilTabs></ProfilTabs>

        </section>
    </main>
</template>

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