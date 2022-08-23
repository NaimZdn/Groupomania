
<template>

    <div class="PostContent__header">

        <div class="PostContent__picture">
            <img class="PostContent__picture-user" :src='userPicture' :alt="'Photo de profil de ' + userPseudo">    
        </div>

        <div class="PostContent__info">
            <div class="PostContent__info-content">
                <h2 id="userPseudo" class="PostContent__info-user">{{ userPseudo }}</h2>
                <p v-if="isAdmin === true" class="PostContent__info-isadmin"> Admin </p>
            </div>
            <p class="PostContent__info-date"> {{ createdAt }}</p>
        </div>

        <div v-if="option === true" class="PostContent__option">
            <fa class="PostContent__option-icon" icon="fa-solid fa-gear" @click="showOption = true" />
            <transition name=OptionFade appear>
                <div class="PostContent__option-content" v-if="showOption === true" >
                    <div class="PostContent__option-button">

                        <div class="PostContent__modification" @click="displayModification = true, showOption = false ">
                            <fa class="PostContent__modification-icon" icon="fa-solid fa-pen" />
                            <span class="PostContent__modification-text"> Modifier </span>
                        </div>

                        <div class="PostContent__delete" @click="deletePost()">
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
        <p id="postText" class="PostContent__content-text">{{ message }}</p>
        <img v-if="picture != '' && picture != undefinedPicture" class="PostContent__content-picture" :src="picture" :alt="'Image posté par ' + userPseudo ">

    </div>

    <div class="PostContent__footer">

        <div class="PostContent__comment" @click="showComment = !showComment">
            <fa class="PostContent__comment-icon" icon="fa-solid fa-comment-dots" />
            <span class="PostContent__comment-number"> {{ this.comments?.length }} </span>
        </div>

        <div id="addLike" class="PostContent__like" @click="checkUserLike()">
            <fa class="PostContent__like-icon" icon="fa-solid fa-thumbs-up" />
            <span class="PostContent__like-number"> {{ likes }} </span>
        </div>

    </div>

    <transition name="slide" appear>
        <div v-if='displayModification === true' class="PostContent__update">
            <div class="PostContent__update-text">
                <textarea class="PostContent__update-message" role="textbox" placeholder="Ajoutez un message"
                    maxlength="300" aria-label="Modifiez le texte de votre post" ref="textarea" v-model="messageUpdate" @input="resizeTextarea()"
                    @click="hiddeError()"> {{ message }}</textarea>

                <span class="PostContent__update-counter"> {{ totalCharacters }}/300 caractères</span>
            </div>

            <div v-if="showValidatorError === true" class="PostContent__feature-error">
                <fa class="PostContent__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                <p class="PostContent__feature-error-text"> {{ this.v$.messageUpdate.required.$message }} </p>
            </div>

            <div v-if="showLengthError === true" class="PostContent__feature-error">
                <fa class="PostContent__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                <p class="PostContent__feature-error-text"> {{ this.v$.messageUpdate.minLength.$message }} </p>
            </div>

            <div v-if='files && picture != "" && picture != undefinedPicture || url != null' class="PostContent__updatepicture">
                <img v-if='files && picture != "" && picture != undefinedPicture' class="PostContent__updatepicture-preview" :src="picture" alt="L'image de votre post">
                <img v-if="url" class="PostContent__updatepicture-preview" :src="url" alt="L'image que vous venez d'upload">
            </div>

            <div v-if="showMulterErrorMessage === true" class="PostContent__feature-error">
                <fa class="PostContent__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                <p class="PostContent__feature-error-text"> {{ this.multerErrorMessage }} </p>
            </div>

            <div class="PostContent__send">
                <label class="PostContent__import-file" aria-label="Cliquez pour importer votre image">
                    <fa icon="fa-solid fa-image" />
                    <input class="PostContent__input" type="file" accept="image/*" aria-label="Importez votre image" @change="changeFile">
                </label>
                <button class="PostContent__button-modification" @click="submitPostUpdate()">Modifier</button>
                <button class="PostContent__button-cancel" @click="hiddeUpdate">Annuler</button>
            </div>
        </div>
    </transition>

    <section class="test">
        <transition name=OptionFade appear>
            <div class="ProfilInformationModification__option-content valid" v-if="validationMessage">
                <div class="ProfilInformationModification__option-button">

                    <div class="ProfilInformationModification__option-profil">
                        <fa class="ProfilInformationModification__option-profil-icon" icon="fa-solid fa-circle-check" />
                        <span class="ProfilInformationModification__option-profil-text"> Votre post a bien été modifié </span>
                        <fa class="ProfilInformationModification__option-profil-close" icon="fa-solid fa-xmark" @click="validationMessage = false" />
                    </div>

                </div>
            </div>
        </transition>
    </section>

    <transition name="fade" appear>
        <div v-if='displayModification === true' class="PostContent__bg" @click="hiddeUpdate">
        </div>
    </transition>



    


    <div v-for="comment in comments">
        <PostComment v-if="showComment" :pseudo="comment.pseudo" :comment='comment.comment' :userId="comment.userId"  :createdAt="dateTime(comment.createdAt)" 
        :commentId="comment._id" :postId="this.postDataId" />
    </div>

<div v-if="showComment">
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
 </div>



</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import { mapState } from 'vuex';
import PostComment from './PostComment.vue';
import PostCreateComment from './PostCreateComment.vue';
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';
export default {
    name: "PostContent",
    components: { PostComment, PostCreateComment },

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            userPicture: '',
            userPseudo: '',
            userInfos: '',
            isAdmin: true || false,  
            option: false,
            showOption: false,
            showComment: false,
            like: 0,
            displayModification: false,
            showValidatorError: false,
            showLengthError: false,
            files: true,
            url: null,
            undefinedPicture: 'http://localhost:3000/images/uploads/posts/undefined',
            file: this.picture,
            showMulterErrorMessage: false,
            validationMessage: false,


            
            showPostPicture: false,
            


            
            
            
            messageModification: '',
            
            
            multerErrorMessage: '',
            messageUpdate: this.message + '',
            
            
            file: this.picture,
            
            postIdComment: this.postId, 

            commentText: '', 
            postDataId: this.postId





        }
    },

    validations() {
        return {
            messageUpdate: {
                required: helpers.withMessage('Votre message doit contenir au moins 2 caractères', required),
                minLength: helpers.withMessage('Votre message doit contenir au moins 2 caractères', minLength(2))
            }
        }
    },

    props: ['picture', 'message', 'likes', 'createdAt', 'comments', 'userId', 'allUsers', 'userPicture2', 'usersLiked', 'postId', 'userData'],
    emits: ['getUserInfo', 'getAllPosts'],

    mounted() {
        if (localStorage.user) {
            this.userInfos = JSON.parse(localStorage.user)

        }
        this.getUserPicture()
        this.getIsAdmin()
        this.displayOption()

    },

    methods: { 
        getUserPicture() {

            if (this.userInfos.userId === this.userId) {
                //console.log('yo')
                this.userPicture = this.userInfos.picture
                this.userPseudo = this.userInfos.pseudo
            } else {

                this.allUser?.map((user) => {
                    if (user._id === this.userId) {
                        this.userPseudo = user.pseudo
                        this.userPicture = user.picture
                        //console.log(this.userPicture)
                        //console.log('enfant')
                        //console.log(this.userPicture)
                    }
                })
            }
        },
        getIsAdmin () {
            this.allUser?.map((user) => {
                if (this.userId === user._id)
                this.isAdmin = user.isAdmin;
            })

        },
        displayOption() {
            if (this.userId === this.userInfos.userId || this.userInfos.isAdmin === true) {
                this.option = true
            }

        },
        dateTime(value) {
            return moment(value).fromNow()

        },
        deletePost() {
            return new Promise((resolve, reject) => {
                axios.delete('http://localhost:3000/api/mainpage/' + this.postId, { withCredentials: true })
                .then((response) => {
                    window.location.reload()
                    resolve(response)
                        
                }).catch((error) => {
                    reject(error)

                })
            })
        },
        checkUserLike() {
            if (this.usersLiked.includes(this.userInfos.userId)) {
                this.like = 0
                console.log('0')
            } else {
                console.log('+1')
                this.like = 1

            }
            const like = {
                like: this.like
            }
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:3000/api/mainpage/' + this.postId + '/like', like, { withCredentials: true })
                    .then((response) => {
                        console.log(response.data)
                        resolve(response.data)
                        this.$emit('getAllPosts')

                    }).catch((error) => {
                        reject(error)
                        console.log(error)
                    })
            })
        },
        resizeTextarea() {
            const element = this.$refs["textarea"];

            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";
        },
        hiddeError() {
            this.showLengthError = false;
            this.showValidatorError = false;

        },
        changeFile(fileUpload) {
            if (this.file === undefined) {
                this.file = this.picture
            }
            this.file = fileUpload.target.files[0];
            this.url = URL.createObjectURL(this.file);
            this.files = false

        },
        displayPicture() {
            if (this.multerErrorMessage != '') {
                this.url = null;
                this.files = true;
            }
        },
        updatePost() {
            const dataForm = new FormData();
            if (this.file === this.picture && this.messageUpdate === this.message) {
                this.displayModification = false
            } else if (this.file === this.picture || this.file === undefined || null ) {
                dataForm.append('image', this.file);
                dataForm.append('message', this.messageUpdate)

                axios.patch('http://localhost:3000/api/mainpage/' + this.postId, dataForm, { withCredentials: true })
                    .then((response) => {
                        this.validationMessage = true
                        this.displayModification = false
                        this.$emit('getAllPosts')

                    }).catch((error) => {
                        const multerError = error.response.data.split(`Error: `)
                        const multerError2 = multerError[1].split(`<br> &nbsp; `)

                        this.multerErrorMessage = multerError2[0]
                        if (this.multerErrorMessage === 'File too large') {
                            this.multerErrorMessage = 'Le fichier est supérieur à 1mo'
                        }
                        this.showMulterErrorMessage = true
                        this.displayPicture() 
                    })
            } else {

                dataForm.append('image', this.file);
                dataForm.append('message', this.messageUpdate)
                axios.patch('http://localhost:3000/api/mainpage/' + this.postId, dataForm, { withCredentials: true })
                    .then((response) => {
                        console.log(response.data)
                        this.validationMessage = true
                        this.displayModification = false
                        this.$emit('getAllPosts')

                    }).catch((error) => {
                        const multerError = error.response.data.split(`Error: `)
                        const multerError2 = multerError[1].split(`<br> &nbsp; `)

                        this.multerErrorMessage = multerError2[0]
                        console.log(this.multerErrorMessage)
                        if (this.multerErrorMessage === 'File too large') {
                            this.multerErrorMessage = 'Le fichier est supérieur à 1mo'
                        }
                        this.showMulterErrorMessage = true
                        this.displayPicture()
                    })
            }
            this.delayCloseAlert()
        },
        submitPostUpdate() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.updatePost();

            } else {
                if (this.v$.messageUpdate.required.$invalid === true)
                    this.showValidatorError = true

                if (this.v$.messageUpdate.minLength.$invalid === true)
                    this.showLengthError = true
            }
        },
        hiddeUpdate() {
            this.displayModification = false
            this.files = true
            this.file = false, 
            this.url = null
            this.showOption = false
            this.showMulterErrorMessage = false

        },
        delayCloseAlert() {
            var self = this;
            setTimeout(function() { 
                self.validationMessage = false; 
                self.errorMessage = false; 
            }, 7000);

        },









        createComment () {
            const dataComment = {
                comment: this.commentText
            }
            axios.patch('http://localhost:3000/api/mainpage/comment/' + this.postId, dataComment, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    this.$emit('getAllPosts')
                    this.commentText = '';
                }).catch((error) => {
                    console.log(error)
                })
        },
        
        
         
    },

    computed: {
        ...mapState({
            allUser: 'allUsers'
        }),
        totalCharacters() {
            return this.messageUpdate.length
        }
    }
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

        &-content {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px

        }

        &-isadmin{
            margin: 0; 
            font-weight: bold;
            padding: 5px; 
            background-color: $color-primary;
            border-radius: 7px;
            color: white; 
        }

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

    &__bg {
        position: fixed;
        inset: 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    &__update {
        margin-top: 40px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;

        flex-direction: column;
        display: flex;
        min-width: 500px;
        max-width: 600px;

        background-color: white;
        padding: 30px;
        border-radius: 6px;
        box-shadow: $primary-shadow;


        @include break-mobile {
            min-width: 67%;
            margin-top: 50px;
        }

        &-message {

            @include input-add;
            margin: 15px 0px 15px 0;
            height: 30px;
            font-size: 15px;


            &::placeholder {
                font-size: 15px;
                font-weight: bold;
                color: $color-primary;

            }
        }

        &-counter {
            font-size: 13px;
            color: $color-tertiary;
            font-weight: bold;
        }
    }

    &__updatepicture {

        justify-content: center;
        margin-bottom: 15px;
        position: relative;

        &-container {
            display: flex;
            justify-content: flex-end;
        }

        &-preview {
            object-fit: cover;
            width: 100%;
            max-height: 720px;
            padding: 20px (30px)
        }

        &-delete {
            margin-right: 5px;


            font-size: 25px;
            color: $color-tertiary;


            &:hover {
                cursor: pointer;
                color: #2D3043;

            }
        }
    }

    &__feature {
        display: flex;
        flex-direction: column;

        &-error {
            display: flex;
            align-items: center;
            margin-top: 10px;
            color: $color-primary;
            font-weight: bold;
            font-size: 16px;


            &-icon {
                font-size: 20px;
                color: $color-primary;
                padding-right: 10px;
                margin: 0 0 4px 0;
            }

            &-text {
                margin: 0 0 4px 0;
            }
        }
    }

    &__text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: -50px;
    }

    &__send {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0 0 0;
        gap: 10px;

        @include break-mobile {
            margin: 20px 0 0 0;

        }
    }

    &__import-file {
        display: flex;
        align-items: center;
        cursor: pointer;

        padding: 5px 8px 3px 8px;

        &:hover {
            background-color: rgb($color-secondary, 0.5);
            border-radius: 30px;
            animation: bubble 0.5s;

        }

        & .fa-image {
            font-size: 25px;
            color: $color-primary;
        }
    }

    &__button {

        &-modification {
            @include send-button;
            background-color: $color-secondary;
            color: $color-primary;

            &:hover {
                background-color: #FED8D0;

            }

        }

        &-cancel {
            @include send-button;

        }
    }
}

.test {
    position: fixed; 
    bottom: 10px;
    left: 30px 
}



@include Fade;
</style>