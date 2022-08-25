<template>
  <MainHeader></MainHeader>
  <main v-if='this.allUsers._id !== ""'>
    <PostCreate />
    <section class="container-flex-column">
      <div class="Post" v-for="post in posts">

        <PostContent @getUserInfo='getUserInfo()' @getAllPosts='getAllPosts' :picture='post.picture'
          :message="post.message" :likes="post.likes" :createdAt="dateTime(post.createdAt)" :comments="post.comments"
          :userId="post.userId" :allUsers="allUsers" :userPicture2='this.userPicture2' :usersLiked="post.usersLiked"
          :postId="post._id"/>

      </div>
    </section>
  </main>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import PostCreate from '../components/PostCreate.vue';
import PostContent from '../components/PostContent.vue';
import moment from 'moment/min/moment-with-locales';
import { mapState } from 'vuex';

export default {
  name: "Mainpage",
  components: { MainHeader, PostCreate, PostContent },

  data() {
    return {
      posts: [],
      userPicture: '',
      userPseudo: '',
      userPicture2: '',
      userInfos: '',
      showComment: false,


    }
  },


  mounted() {
    if (this.user.userId === ''){
      this.$router.push('/')
    }
    this.getAllPosts()
    this.getAllUsers()
    moment.locale('fr')

  },

  methods: {
    getAllPosts() {
      this.$store.dispatch('getAllPosts')
        .then((response) => {
          this.posts = response.data

        })
        .catch((error) => {
          console.log(error)

        })
    },

    getAllUsers() {
      this.$store.dispatch('getAllUsers')
        .then((response) => {

        })
        .catch((error) => {
          console.log(error)
        })

    },
    dateTime(value) {
      return moment(value).fromNow()
    },

    displayInfo() {
      if (this.allUsers._id !== "") {
        this.getAllPosts()
        this.getAllUsers()

      }
    },
    displayCreateComment() {
      this.showComment = true
    }
  },

  computed: {
    ...mapState({
      user: 'user',
      allUsers: 'allUsers'
    })
  }

}
</script>

<style lang="scss">
@import "../assets/sass/main.scss";

.container-flex-column {
  display: flex;
  align-items: center;
  flex-direction: column;
}

;

.Post {
  background-color: white;
  margin: 30px 0 30px 0;
  box-shadow: $primary-shadow;
  border-radius: 12px;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  gap: 20px;


}
</style>