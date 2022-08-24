<template>
    <transition name="slide2" appear>
        <div class="PostComment">

            <div class="PostComment__picture">
                <img class="PostComment__picture-user" :src="userPicture" :alt="'Photo de profil de ' + pseudo"> 
            </div>

            <div class="PostComment__content">
                <div class="PostComment__content-header">

                    <div class="PostComment__content-container">
                        <p class="PostComment__content-pseudo"> {{ pseudo }}</p>
                        <p class="PostComment__content-time"> {{ createdAt }}</p>
                    </div>

                    <div v-if='option === true' class="PostComment__content-option">
                        <fa class="PostComment__content-icon" icon="fa-solid fa-ellipsis-vertical" @click="showOption = true" />

                        <transition name=OptionFade appear>
                            <div class="PostComment__option-content" v-if="showOption === true" >

                                <div class="PostComment__option-button">

                                    <div class="PostComment__modification" @click="showUpdateComment = true, showOption = false">
                                        <fa class="PostComment__modification-icon" icon="fa-solid fa-pen" />
                                        <span class="PostComment__modification-text"> Modifier </span>
                                    </div>

                                    <div class="PostComment__delete" @click="deleteComment(), showOption = false">
                                        <fa class="PostComment__delete-icon" icon="fa-solid fa-trash-can" />
                                        <span class="PostComment__delete-text"> Supprimer </span>
                                    </div>
                                </div>
                            </div>
                        </transition>

                    </div>
                    <div class="PostComment__option-bg" v-if="showOption" @click="showOption = false"> </div>

                </div>
                <p class="PostComment__content-comment"> {{ comment }} </p>

                <transition name=OptionFade appear>
                    <div class="PostComment__option-content" v-if="showOption" @click="showOption = true"></div>
                </transition>
            </div>

            <transition name="slide" apeear>
                <div v-if='showUpdateComment === true' class="PostContent__update">
                    <div class="PostContent__update-text">
                        <textarea class="PostContent__update-message" role="textbox"
                            placeholder="Modifiez votre commentaire" maxlength="300" aria-label="Modifiez votre commentaire" ref="textarea"
                            v-model="commentUpdate" @input="resizeTextarea()" @click="hideValidatorError()"> {{ comment }}</textarea>

                        <span class="PostContent__update-counter"> {{ totalCharacters }}/300 caractères</span>
                    </div>

                    <div v-if="showValidatorError === true" class="PostContent__feature-error">
                        <fa class="PostContent__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                        <p class="PostContent__feature-error-text"> {{ this.v$.commentUpdate.required.$message }} </p>
                    </div>

                    <div v-if="showLengthError === true" class="PostContent__feature-error">
                        <fa class="PostContent__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                        <p class="PostContent__feature-error-text"> {{ this.v$.commentUpdate.minLength.$message }} </p>
                    </div> 
                    
                    <div class="PostContent__send">
                        <button class="PostContent__button-modification" @click="submitUpdateComment()">Modifier</button>
                        <button class="PostContent__button-cancel" @click="showUpdateComment = false">Annuler</button>
                    </div>
                </div>
            </transition>

            <transition name="fade" appear>
                <div v-if='showUpdateComment === true' @click="showUpdateComment = false " class="PostContent__bg"></div>
            </transition>

        </div>
    </transition>

    <section class="ProfilInformationModification__container">
        <transition name=OptionFade appear>
            <div class="ProfilInformationModification__option-content" v-if="errorMessageCommentDelete">
                <div class="ProfilInformationModification__option-button">

                    <div class="ProfilInformationModification__option-profil">
                        <fa class="ProfilInformationModification__option-profil-icon" icon="fa-solid fa-circle-check" />
                        <span class="ProfilInformationModification__option-profil-text"> Vous ne pouvez supprimer ce commentaire </span>
                        <fa class="ProfilInformationModification__option-profil-close" icon="fa-solid fa-xmark" @click="errorMessageCommentDelete = false" />
                    </div>

                </div>
            </div>
        </transition>
    </section>

    <section class="ProfilInformationModification__container">
        <transition name=OptionFade appear>
            <div class="ProfilInformationModification__option-content" v-if="errorMessageCommentUpdate">
                <div class="ProfilInformationModification__option-button">

                    <div class="ProfilInformationModification__option-profil">
                        <fa class="ProfilInformationModification__option-profil-icon" icon="fa-solid fa-circle-check" />
                        <span class="ProfilInformationModification__option-profil-text"> Vous ne pouvez modifier ce commentaire </span>
                        <fa class="ProfilInformationModification__option-profil-close" icon="fa-solid fa-xmark" @click="errorMessageCommentUpdate = false" />
                    </div>

                </div>
            </div>
        </transition>
    </section>
</template>

<script>

import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: "PostComment",
    props: ['comment', 'pseudo', 'userId', 'createdAt', 'commentId', 'postId'],

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            userInfos: '', 
            userPicture: '',
            option: false, 
            showOption: false,
            showUpdateComment: false,
            commentUpdate: this.comment + '',

            showLengthError: false,
            showValidatorError: false,
            errorMessageCommentDelete: false, 
            errorMessageCommentUpdate: false, 

        }
    },
    validations() {
        return {
            commentUpdate : {
                required: helpers.withMessage('Votre commentaire doit contenir au moins 2 caractères', required),
                minLength: helpers.withMessage('Votre commentaire doit contenir au moins 2 caractères', minLength(2))

            }, 
        }
    },

    mounted() {
        this.getUserInfo()
        if (localStorage.user) {
            this.userInfos = JSON.parse(localStorage.user)

        }
        this.displayOption()

    },

    methods: {
        getUserInfo() {
            this.allUsers?.map((user) => {
                if (user._id === this.userId) {
                    this.userPicture = user.picture

                }
            })
        },
        displayOption() {
            if (this.userId === this.userInfos.userId || this.userInfos.isAdmin === true) {
                this.option = true
            }

        },
        deleteComment() {
            const dataDeleteComment = {
                commentId: this.commentId
            }
            axios.patch('http://localhost:3000/api/mainpage/delete-comment/' + this.postId, dataDeleteComment, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    window.location.reload()
                }).catch((error) => {
                    console.log(error)
                    if (error.response.data.error === 'Vous ne pouvez pas supprimer ce commentaire') {
                            this.errorMessageCommentDelete = true 
                    }
                })
            this.delayCloseAlert()
        },
        delayCloseAlert() {
            var self = this;
            setTimeout(function() { 
                self.errorMessageCommentUpdate = false
                self.errorMessageCommentDelete = false
            }, 7000);

        },
        submitUpdateComment() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this. updateComment();

            } else {
                if (this.v$.commentUpdate.required.$invalid === true)
                    this.showValidatorError = true

                if (this.v$.commentUpdate.minLength.$invalid === true)
                    this.showLengthError = true
            }
        },
        updateComment() {
            const dataUpdateComment = {
                commentId: this.commentId,
                comment: this.commentUpdate,
            }
            axios.patch('http://localhost:3000/api/mainpage/edit-comment/' + this.postId, dataUpdateComment, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    window.location.reload()
                }).catch((error) => {
                    console.log(error)
                    if (error.response.data.error === 'Vous ne pouvez pas modifier ce commentaire') {
                            this.errorMessageCommentUpdate = true 
                            
                    }
                })
            this.delayCloseAlert()

        },
        hideValidatorError (){
            this.showLengthError = false; 
            this.showValidatorError = false; 
        }, 
        resizeTextarea() {
            const element = this.$refs["textarea"];
            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";
        },
    },

    computed: {
        ...mapState({
            allUsers: 'allUsers'
        }),
        totalCharacters() {
            return this.commentUpdate.length
        }
    }
}
</script>

<style lang="scss">
@import "../assets/sass/main.scss";

.PostComment {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin: 0 30px 0 30px;

    @include break-mobile {
        margin: 0 15px 0 15px;
    }

    &__picture {
        min-width: 40px;
        min-height: 40px;
        height: 40px;
        width: 40px;

        @include break-mobile {
            margin-left: 0;
        }

        &-user {
            @include profil-picture;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        padding: 10px 10px 0 10px;
        background-color: whitesmoke;
        border-radius: 10px;
        width: 100%;
        max-width: 628px;
        margin-bottom: 15px;

        @include break-mobile {
            max-width: 669px;
        }

        &-header {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex: 100%;

        }

        &-container {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 30%
        }

        &-time {
            font-size: 12px;
            font-style: italic;
            margin: 0 0 8px 0;
        }

        &-icon {
            font-size: 20px;
            color: $color-tertiary;

            &:hover {
                animation: bubble 0.5s;
                cursor: pointer;
                color: #2D3043;
            }
        }

        &-pseudo,
        &-comment {
            margin: 0 0 10px 0;

            &:nth-child(1) {
                font-weight: 600;

            }
        }

        &-option {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: relative;

        }
    }

    &__option {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;


        &-content {
            position: absolute;
            bottom: -520%;
            right: -1300%;
            transform: translate(-50%, -50%);
            z-index: 99;
            flex-direction: column;
            display: flex;
            min-width: 10%;
            background-color: white;
            border-radius: 6px;
            box-shadow: $primary-shadow;

        }

        &-button {
            display: flex;
            flex-direction: column;
            gap: 2px
        }

        &-bg {
            position: fixed;
            inset: 0;
            z-index: 98;
            background-color: rgba(0, 0, 0, 0);
            cursor: pointer;

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

            font-size: 15px;
            padding-right: 10px;

        }

        &-text {
            font-size: 13px;
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
            font-size: 15px;
            padding-right: 13px;

        }

        &-text {
            font-size: 13px;
            font-weight: bold;

        }

    }
}

.slide2-enter-active,
.slide2-leave-active {
    transition: transform .4s, opacity .5s;

}

.slide2-enter-from,
.slide2-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>


