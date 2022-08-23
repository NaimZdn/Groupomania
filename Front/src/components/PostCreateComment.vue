<template>
    <div class="PostCreateComment__content">
        <div class="PostCreateComment__line"> </div>
    </div>

    <div class="PostCreateComment">
        <div class="PostCreateComment__picture line ">
            <img class="PostCreateComment__picture-user" :src="userInfos.picture"
                alt="Votre photo de profil">
        </div>
        
        <textarea class="PostCreateComment__comment" ref='textarea' role="textbox" placeholder="Ajoutez un commentaire" maxlength="300" v-model='commentText' @input="resizeTextarea()" ></textarea>
    </div>

    <div class="PostCreateComment__button">
        <button class="PostCreateComment__button-send" @click="createComment()">PUBLIER</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PostCreateComment',
    props: ['postId', 'emitGetAllPosts'], 

    data() {
        return {
            userInfos: '',
            commentText: '', 
        

        }
    },
    mounted() {
        if (localStorage.user) {
            this.userInfos = JSON.parse(localStorage.user)
            //console.log(this.userInfos)
        }
        
    },
    methods: {
        createComment () {
            const dataComment = {
                comment: this.commentText
            }
            axios.patch('http://localhost:3000/api/mainpage/comment/' + this.postId, dataComment, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    this.displayCreateComment
                }).catch((error) => {
                    console.log(error)
                })
        }, 
        resizeTextarea() {
            const element = this.$refs["textarea"];
            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";
        },
        
    },
}
</script>

<style lang="scss">
@import "../assets/sass/main.scss";

.PostCreateComment {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin: 15px 30px 0 30px;
    align-items: center;
   

    @include break-mobile {
        margin: 0 15px 0 15px;
    }

    &__content {
        display: flex;
        justify-content: center;
    }


    &__picture {
        @include profil-picture__container;

        &-user {
            @include profil-picture;

        }
    }

    &__comment {
        align-items: center;
        height: 30px;
        font-size: 15px;
        @include input-add;

        @include break-mobile {
            margin: 0;

        }

        &::placeholder {
            font-size: 15px;
            font-weight: bold;
            color: $color-primary;
        }
    }

    &__button {
        display: flex;
        justify-content: flex-end;
        margin: 15px 30px 30px 0;

        @include break-mobile {
            margin: 0 15px 30px 0;
        }

        &-send {
            @include send-button;

        }
    }
}
</style>