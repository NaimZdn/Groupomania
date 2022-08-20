<template>
    <section class="container-flex">
        <div class="PostCreate">

            <div class="PostCreate__form">
                <div class="PostCreate__picture">
                    <img class="PostCreate__picture-user" :src="this.userInfos.picture" alt="Votre photo de profil">
                </div>
                <textarea class="PostCreate__comment" ref='textarea' role="textbox" placeholder="Ajoutez un post" maxlength="300" v-model='message' @input="resizeTextarea()" @focus="hideError" ></textarea>
            </div>

            <div v-if="files" class="PostCreate__addpicture">
                <fa class="PostCreate__addpicture-delete" icon="fa-solid fa-xmark" @click="deletePicturePreview" />
                <img class="PostCreate__addpicture-preview" :src="url">
                
            </div>

            <div class='PostCreate__feature'> 
                <span class="PostCreate__counter"> {{ totalCharacters }}/300 caractères</span>

                <div v-if="showValidatorError === true" class="PostCreate__feature-error"> 
                    <fa class="PostCreate__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                    <p class="PostCreate__feature-error-text"> {{this.v$.message.required.$message}} </p>
                </div>

                <div v-if="showLengthError === true" class="PostCreate__feature-error"> 
                    <fa class="PostCreate__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                    <p class="PostCreate__feature-error-text"> {{this.v$.message.minLength.$message}} </p>
                </div>

                 <div v-if="showMulterErrorMessage === true" class="PostCreate__feature-error"> 
                    <fa class="PostCreate__feature-error-icon" icon="fa-solid fa-circle-xmark" />
                    <p class="PostCreate__feature-error-text"> {{this.multerErrorMessage}} </p>
                </div>
                
            </div>

            <div class="PostCreate__send">
                <label class="PostCreate__import-file" aria-label="Cliquez pour importer votre image">
                    <fa icon="fa-solid fa-image" />
                    <input class="PostCreate__input" type="file" accept="image/*" aria-label="Importez votre image" @change="changeFile">
                </label>
                <button class="PostCreate__button" @click="submitPost()">PUBLIER</button>
            </div>
        </div>
    </section>



<section class="test">
            <transition name=OptionFade appear>
                <div class="ProfilInformationModification__option-content" v-if="validationMessage">
                    <div class="ProfilInformationModification__option-button">

                            <div class="ProfilInformationModification__option-profil">
                                <fa class="ProfilInformationModification__option-profil-icon" icon="fa-solid fa-circle-check" />
                                <span class="ProfilInformationModification__option-profil-text"> Votre post a bien été crée </span>
                            </div>

                    </div>
                </div>
            </transition>
        </section>





</template>

<script>
import { mapState } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

export default {
    setup() {
        return {v$: useVuelidate()}
    }, 
    name: 'PostCreate',
    emits: ['getAllPosts', 'getAllUsers', 'getUserInfo'],
    data() {
        return {
            message: '',
            picture: '',
            url: null,
            files: false,
            popup: false,
            maxLength: 300,
            userInfos: [], 
            validatorErrorMessage: '',
            showValidatorError: false, 
            showLengthError: false, 
            multerErrorMessage: '', 
            showMulterErrorMessage: false,  
            validationMessage: false,
            
        }
    },

    validations(){
        return {
            message: {
                required: helpers.withMessage('Votre message doit contenir au moins 2 caractères', required),
                minLength: helpers.withMessage( 'Votre message doit contenir au moins 2 caractères', minLength(2))
            }

        }
    }, 

    mounted() {
        if (localStorage.user) {
            this.userInfos = JSON.parse(localStorage.user)
            //console.log(this.userInfos)
        }
    },

    methods: {
        changeFile(fileUpload) {
            this.file = fileUpload.target.files[0];
            this.url = URL.createObjectURL(this.file);
            this.files = true;

        },
        resizeTextarea() {
            const element = this.$refs["textarea"];
            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";
        },
        submitPost() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.$emit('getAllUsers') 
                this.createPost();
                   
                this.$emit('getAllPosts')
               
            } else {
                if (this.v$.message.required.$invalid === true)
                this.showValidatorError = true

                if (this.v$.message.minLength.$invalid === true)
                this.showLengthError = true
            }
        },

        createPost() {
            
            const dataForm = new FormData();
            dataForm.append('image', this.file);
            dataForm.append('message', this.message);
            this.$store.dispatch('createPost', dataForm)
                .then((response) => {
                    console.log(response)
                    this.message = '', 
                    this.files = false
                    this.showMulterErrorMessage = false
                    this.validationMessage = true 
                    this.delayCloseAlert()
                    this.$emit('getAllUsers') 
                    
                    //this.$emit('getUserInfo');
                    //this.$router.go('/mainpage')
                    
                    //this.displayModification = false

                })
                .catch((error) => {
                    const multerError = error.response.data.split(`Error: `)
                    const multerError2 = multerError[1].split(`<br> &nbsp; `)

                    this.multerErrorMessage = multerError2[0]
                    if (this.multerErrorMessage === 'File too large') {
                        this.multerErrorMessage = 'Le fichier est supérieur à 1mo'
                    }
                    
                    console.log(this.multerErrorMessage)
                    this.showMulterErrorMessage = true 
                    this.hideErrorContent()
                    //console.log(this.bio)
                })
        },
        getAllPosts() {
            this.$store.dispatch('getAllPosts')
                .then((response) => {
                     console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        deletePicturePreview() {
            this.url = null;
            this.file = null;
            this.files = false;

        }, 
        hideError(){
            this.showValidatorError = false
            this.showLengthError = false 
            
        },
        hideErrorContent() {
            if (this.multerErrorMessage != '') {
                this.files = false
            }

        }, 
        delayCloseAlert() {
            var self = this;

            setTimeout(function() { 
                self.validationMessage = false; 
            }, 7000);
        },
    },

    computed: {
        ...mapState({
            //userInfos: 'userInfos'
        }),

        totalCharacters() {
            return this.message.length
        },

    },
}


</script>

<style lang='scss'>
@import "../assets/sass/main.scss";

@include ContainerFlex;

.PostCreate {

    background-color: white;
    margin: 120px 0 30px 0;
    box-shadow: $primary-shadow;
    border-radius: 12px;
    padding-bottom: 30px;
    max-width: 748px;
    width: 100%;

    &__form {
        display: flex;
        flex-basis: 100%;
        align-items: center;
        gap: 20px;
        margin: 30px 0 10px 30px;

        @include break-mobile {
            margin: 30px 15px 10px 15px;

        }
    }

    &__picture {
        @include profil-picture__container;

        &-user {
            @include profil-picture
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

    &__addpicture {
        
        justify-content: center;
        margin-bottom: 15px;

        &-preview {
            object-fit: cover;
            width: 100%;
            max-height: 720px;
            padding: 15px (70px);
        }

        &-delete {
            position: relative;
            left: 703px;
            top: 5px;
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
            align-items:center; 
            margin-left: 100px; 
            margin-top: 10px;
            color: $color-primary; 
            font-weight: bold;
            font-size: 16px;
        

            &-icon{
                font-size: 20px;
                color: $color-primary; 
                padding-right: 10px;
                margin: 10px 0 4px 0; 
            }

            &-text {
                margin: 10px 0 4px 0; 
            }
        }
    }

    &__counter {
        margin-left: 100px;
        margin-top: 5px;
        font-size: 13px;
        color: $color-tertiary;
        font-weight: bold;

        @include break-mobile {
            margin-left: 85px;
        }

    }


    &__send {
        display: flex;
        justify-content: flex-end;
        margin: 10px 30px 0 0;

        @include break-mobile {
            margin: 20px 15px 0 0;

        }

    }

    &__import-file {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 20px;
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
        @include send-button;

    }
}


input[type="file"] {
    position: absolute;
    width: 100px;
    height: 100px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
</style>