<script>
import MainHeader from '../components/MainHeader.vue';
import PostCreate from '../components/PostCreate.vue';
import PostComment from '../components/PostComment.vue';
import PostContent from '../components/PostContent.vue';
import PostCreateComment from '../components/PostCreateComment.vue';


export default {
  name: "Mainpage",
  components: { MainHeader, PostCreate, PostComment, PostContent, PostCreateComment }
}

</script>
<template>
  <MainHeader></MainHeader>

  <main>
    <PostCreate></PostCreate>
    <section class="container-flex">
      <div class="Post">
        <PostContent></PostContent>
        <PostComment></PostComment>
        <PostCreateComment></PostCreateComment>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

@include ContainerFlex;

.Post {
    background-color: white;
    margin: 30px 0 30px 0;
    box-shadow: $primary-shadow;
    border-radius: 12px;
    flex-direction: column;
    max-width: 748px;
    width: 100%;

}
</style>