<script>
import PostContent from './PostContent.vue';
export default {
    name: "ProfilTabsActivity",
    components: { PostContent }
}
</script>

<template>
    <article class="ProfilTabsActivity">
        <div class="ProfilTabsActivity__content">
            <PostContent></PostContent>
        </div>
    </article>
</template>

<style lang="scss">
@import "../assets/sass/main.scss";

.user-tab-content-container {
    margin: 0 30px 20px 30px;

    @include break-mobile {
        margin: 0 15px 20px 15px; 
    }
   
 }

 .ProfilTabsActivity {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: $color-primary;
    border-radius: 0 6px 6px 6px; 

    &__content {
        background-color: white;
        width: 100%;
        border-radius: 6px;

    }
}
</style>