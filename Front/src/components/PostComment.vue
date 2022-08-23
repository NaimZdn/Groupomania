<template>
    <transition name="slide2" appear>
        <div class="PostComment">

            <div class="PostComment__picture">
                <a href=""> <img id="userPicture" class="PostComment__picture-user" :src="userPicture"> </a>
            </div>

            <div class="PostComment__content">

                <div class="PostComment__content-header">

                    <div class="PostComment__content-container">
                        <p class="PostComment__content-pseudo"> {{ pseudo }}</p>
                        <p class="PostComment__content-time"> {{ createdAt }}</p>
                    </div>

                    <div class="PostComment__content-option">
                        <fa class="PostComment__content-icon" icon="fa-solid fa-ellipsis-vertical"
                            @click="showOption = true" />
                        <transition name=OptionFade appear>
                            <div class="PostComment__option-content" v-if="showOption" @click="showOption = true">

                                <div class="PostComment__option-button">

                                    <div class="PostComment__modification" @click="showUpdateComment = true">
                                        <fa class="PostComment__modification-icon" icon="fa-solid fa-pen" />
                                        <span class="PostComment__modification-text">
                                            Modifier </span>
                                    </div>

                                    <div class="PostComment__delete" @click="deleteComment()">
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
                <textarea class="PostContent__update-message" role="textbox" placeholder="Modifier votre commentaire"
                    maxlength="300" ref="textarea" v-model="commentUpdate" @input="resizeTextarea()"> {{ comment }}</textarea>

                <span class="PostContent__update-counter"> {{ totalCharacters }}/300 caractères</span>
            </div>

           <!-- <div v-if="showValidatorError === true" class="PostContent__feature-error">
                <fa class="PostContent__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                <p class="PostContent__feature-error-text"> {{ this.v$.messageUpdate.required.$message }} </p>
            </div>

            <div v-if="showLengthError === true" class="PostContent__feature-error">
                <fa class="PostContent__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                <p class="PostContent__feature-error-text"> {{ this.v$.messageUpdate.minLength.$message }} </p>
            </div>

            <div v-if="showMulterErrorMessage === true" class="PostContent__feature-error">
                <fa class="PostContent__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                <p class="PostContent__feature-error-text"> {{ this.multerErrorMessage }} </p>
            </div>-->

            <div class="PostContent__send">
                <button class="PostContent__button-modification" @click="updateComment()">Modifier</button>
                <button class="PostContent__button-cancel" @click="showUpdateComment = false">Annuler</button>
            </div>
        </div>




            </transition>

            <transition name="fade" appear>
                <div v-if='showUpdateComment === true' class="PostContent__bg" >
                </div>
            </transition>

        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    name: "PostComment",
    props: ['comment', 'pseudo', 'userId', 'createdAt', 'commentId', 'postId'],

    data() {
        return {
            userPicture: '',
            showOption: false,
            showUpdateComment: false,
            commentUpdate: '', 

        }
    },

    mounted() {
        this.getUserInfo()
        console.log(this.postId)

    },

    methods: {
        getUserInfo() {
            this.allUsers?.map((user) => {
                if (user._id === this.userId) {
                    this.userPicture = user.picture
                    //console.log(this.userPicture2)

                }
            })
        },
        deleteComment() {
            const dataDeleteComment = {
                commentId: this.commentId
            }
            axios.patch('http://localhost:3000/api/mainpage/delete-comment/' + this.postId, dataDeleteComment, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
        },
        displayUpdateComment() {
            this.showUpdateComment = true 

        }, 
        resizeTextarea() {
            const element = this.$refs["textarea"];
            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";
        },
        updateComment() {
            const dataUpdateComment = {
                commentId: this.commentId,
                comment: this.commentUpdate,
            }
            axios.patch('http://localhost:3000/api/mainpage/edit-comment/' + this.postId, dataUpdateComment, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })

        }
        


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


