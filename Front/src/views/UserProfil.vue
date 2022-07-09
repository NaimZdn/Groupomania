<script>
import MainHeader from '../components/MainHeader.vue';
import ProfilInformation from '../components/ProfilInformation.vue';
import ProfilTabs from '../components/ProfilTabs.vue';
import PostContent from '../components/PostContent.vue';
import PostComment from '../components/PostComment.vue';
import PostCreateComment from '../components/PostCreateComment.vue';
import ProfilTabsSettings from '../components/ProfilTabsSettings.vue';
export default {
    name: "UserProfil",
    components: { MainHeader, ProfilInformation, ProfilTabs, PostContent, PostComment, PostCreateComment, ProfilTabsSettings }
}

</script>

<template>

    <MainHeader></MainHeader>

    <main class="container-flex">
        <section class="Profil">
            <ProfilInformation></ProfilInformation>
            <ProfilTabs></ProfilTabs>

            <div class="user-tab-content-container">
                <div class="content-activity">
                    <article class="activity-post-container">
                        <PostContent></PostContent>
                        <PostComment></PostComment>
                        <PostCreateComment></PostCreateComment>
                    </article>
                </div>
                <!-- <ProfilTabsSettings></ProfilTabsSettings> -->

            </div>
        </section>
    </main>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

@include ContainerFlex;

.Profil {
    margin-top: 80px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 3px 8px rgb(154, 57, 38, 40%);
    max-width: 748px;
    width: 100%;
    
}

.user-tab-content-container {
    margin: 0 30px 20px 30px;

    @include break-mobile {
        margin: 0 15px 20px 15px; 
    }
   
 }

 .content-activity {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: $color-primary;
    border-radius: 0 6px 6px 6px; 
 }

 .activity-post-container {
    background-color: white;
    width: 100%;
    border-radius: 6px;
}

</style>