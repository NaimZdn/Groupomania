<template>
  <MainHeader></MainHeader>
  <main>
    <PostCreate></PostCreate>
    <section class="container-flex-column">
      <div class="Post" v-for="post in posts">
        <PostContent :picture='post.picture' :message="post.message" :likes="post.likes" :createdAt="dateTime(post.createdAt)" :comments="post.comments"></PostContent>
        </div>
    
      
    </section>
  </main>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import PostCreate from '../components/PostCreate.vue';
import PostComment from '../components/PostComment.vue';
import PostContent from '../components/PostContent.vue';
import PostCreateComment from '../components/PostCreateComment.vue';
import moment from 'moment/min/moment-with-locales'; 

export default {
  name: "Mainpage",
  components: { MainHeader, PostCreate, PostComment, PostContent, PostCreateComment }, 

  data() {
    return {
      posts: [], 
    }
  }, 

  mounted(){
    this.getAllPosts()
    moment.locale('fr')
    
  },

  methods: {
    getAllPosts() {
      this.$store.dispatch('getAllPosts')
      .then((response) => {
        this.posts = response.data
      
        console.log(this.posts)
      })
      .catch((error) => {
        console.log(error)
      })
    },

    dateTime(value) {
      
      return moment(value).fromNow()
    }
  },



}
</script>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.container-flex-column {
  display: flex;
  align-items: center; 
  flex-direction: column; 
};

.Post {  
    background-color: white;
    margin: 30px 0 30px 0;
    box-shadow: $primary-shadow;
    border-radius: 12px;
    flex-direction: column;
    max-width: 748px;
    width: 100%;
    gap: 20px; 


}
</style>