
<template>

<section v-if="userPicture === userPicture2"></section>
    <div class="PostContent__header">

        <div class="PostContent__picture">
            <router-link to="/profil"> <img id="userPicture" class="PostContent__picture-user" :src='userPicture' alt="Photo de profil de l'utilisateur ayant crée le post">
           </router-link>
        </div>

        <div class="PostContent__info">
            <h2 id="userPseudo" class="PostContent__info-user">{{}}</h2>
            <p id="postDate" class="PostContent__info-date"> {{createdAt}}</p>
        </div>

        
            <div class="PostContent__option">
                <fa id="postOption" class="PostContent__option-icon" icon="fa-solid fa-gear"
                    @click="showOption = true" />

                <transition name=OptionFade appear>
                <div class="PostContent__option-content" v-if="showOption" @click="showOption = true">
                    <div class="PostContent__option-button">

                        <div class="PostContent__modification">
                            <fa class="PostContent__modification-icon" icon="fa-solid fa-pen" />
                            <span class="PostContent__modification-text"> Modifier </span>
                        </div>

                        <div class="PostContent__delete">
                            <fa class="PostContent__delete-icon" icon="fa-solid fa-trash-can" />
                            <span class="PostContent__delete-text"> Supprimer </span>
                        </div>

                    </div>
                </div>
                </transition>
            </div>
    
        <div class="PostContent__option-bg" v-if="showOption" @click="showOption = false"> </div>

    </div>

    <div class="PostContent__content">
        <p id="postText" class="PostContent__content-text">{{message}}</p>
        <img v-if="picture != '' " class="PostContent__content-picture" :src="picture" alt="Image posté par 'pseudo de l'utilisateur'">
        
    </div>

    <div class="PostContent__footer">

        <div id="showComment" class="PostContent__comment" @click="showComment = !showComment">
            <fa class="PostContent__comment-icon" icon="fa-solid fa-comment-dots" />
            <span class="PostContent__comment-number">  </span>
        </div>

        <div id="addLike" class="PostContent__like">
            <fa class="PostContent__like-icon" icon="fa-solid fa-thumbs-up" />
            <span class="PostContent__like-number"> {{likes}} </span>
        </div>

    </div>
    <div v-for="comment in comments"> 
        <PostComment v-if="showComment" :pseudo="comment.pseudo" :comment='comment.comment'/>
    </div>
    <PostCreateComment v-if="showComment"></PostCreateComment>

</template>

<script>
import { mapState } from 'vuex';
import PostComment from './PostComment.vue';
import PostCreateComment from './PostCreateComment.vue';
export default {
    name: "PostContent",
    components: { PostComment, PostCreateComment },

    data() {
        return {
            //comments: [], 
            showComment: false,
            showOption: false,
            showPostPicture: false, 
            userPicture: '',
            //userPseudo: '',  
            userInfos: '',
            
        }
    }, 

    props: ['picture', 'message', 'likes', 'createdAt', 'comments', 'userId', 'allUsers','userPicture2' ],
    emits: ['getUserInfo', 'getAllPosts'],

    mounted () {
       //this.$emit('getUserInfo')
       // this.$emit('getAllPosts')
        this.getUserPicture ()

    }, 


    methods: {
        getUserPicture () {
            this.allUsers?.map((user) => {
                if (user._id === this.userId) {
                    this.userPseudo = user.pseudo
                    this.userPicture = user.picture
                    //console.log(this.userPicture)
                }
            })
        }, 
    }, 



}
</script>

<style lang="scss">
@import "../assets/sass/main.scss";

.PostContent {

    &__header {
        display: flex;
        flex-basis: 100%;
        position: relative;
        margin: 30px;

        @include break-mobile {
            margin: 30px 15px 30px 15px;
        }

    }

    &__picture {
        @include profil-picture__container;

        &-user {
            @include profil-picture;

        }
    }

    &__info {
        padding-left: 20px;
        flex: 75%;

        &-user {
            font-size: 16px;
            margin: 0px;

        }

        &-date {
            margin: 8px 0 0 0;
            color: rgba(0, 0, 0, 0.54);
            font-size: 14px;

        }
    }

    &__option {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;

        &-icon {
            font-size: 20px;
            color: $color-primary;

            &:hover {
                animation: bubble 0.5s;
                cursor: pointer;
            }
        }

        &-content {
            position: absolute;
            bottom: -200%;
            right: -320%;
            transform: translate(-50%, -50%);
            z-index: 99;
            flex-direction: column;
            display: flex;
            min-width: 25%;
            background-color: white;
            border-radius: 6px;
            box-shadow: $primary-shadow;

        }

        &-button {
            display: flex;
            flex-direction: column;
            gap: 5px

        }

        &-bg {
            position: fixed;
            inset: 0;
            z-index: 98;
            background-color: rgba(0, 0, 0, 0);

        }
    }

    &__modification {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        padding: 10px 70px 5px 8px;
        cursor: pointer;
        color: $color-tertiary;
        align-items: center;

        &:hover {
            background-color: whitesmoke;
            color: #2D3043;

        }

        &-icon {

            font-size: 18px;
            padding-right: 10px;

        }

        &-text {
            font-size: 16px;
            font-weight: bold;

        }
    }

    &__delete {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        padding: 5px 5px 10px 8px;
        cursor: pointer;
        color: $color-tertiary;

        &:hover {
            background-color: whitesmoke;
            color: #2D3043;

        }

        &-icon {
            font-size: 18px;
            padding-right: 13px;


        }

        &-text {
            font-size: 16px;
            font-weight: bold;

        }
    }

    &__content {
        

        &-text {
            margin: 25px 30px 25px 30px;
            border-left: 3px solid $color-primary;
            line-height: 30px;
            padding-left: 10px;

            @include break-mobile {
                margin: 25px 15px 25px 15px;
            }
        }

        &-picture {
          
            width: 100%;
            max-height: 720px;
            object-fit: cover;
            border: 1px solid rgb($color-secondary, 0.5);
            border-right: 0;
            
            
        }
    }

    &__modification {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        padding: 10px 70px 5px 8px;
        cursor: pointer;
        color: $color-tertiary;
        align-items: center;

        &:hover {
            background-color: whitesmoke;
            color: #2D3043;

        }

        &-icon {

            font-size: 18px;
            padding-right: 10px;

        }

        &-text {
            font-size: 16px;
            font-weight: bold;

        }
    }

    &__delete {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        padding: 5px 5px 10px 8px;
        cursor: pointer;
        color: $color-tertiary;

        &:hover {
            background-color: whitesmoke;
            color: #2D3043;

        }

        &-icon {
            font-size: 18px;
            padding-right: 13px;


        }

        &-text {
            font-size: 16px;
            font-weight: bold;

        }
    }

    &__footer {
        border-top: 2px solid $color-primary;
        display: flex;
        margin: 15px 30px 15px 30px;
        padding-top: 15px;
        justify-content: center;

        @include break-mobile {
            margin: 15px
        }
    }

    &__comment {
        @include CommentOrLike__button;

    }

    &__like {
        @include CommentOrLike__button;

    } 
}
@include Fade; 
</style>