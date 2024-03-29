<template>
    <section class="container-flex">
        <div class="PostCreate">
            <div class="PostCreate__form">
                <div class="PostCreate__picture">
                    <img class="PostCreate__picture-user" :src="this.userInfos.picture" alt="Votre photo de profil">
                </div>
                <textarea class="PostCreate__comment" ref='textarea' role="textbox" placeholder="Ajoutez un post" maxlength="300" aria-label="Ajoutez un post" v-model='message' @input="resizeTextarea()" @focus="hideError" ></textarea>
            </div>
            <span class="PostCreate__counter"> {{ totalCharacters }}/300 caractères</span>

            <div v-if="files" class="PostCreate__addpicture">
                <div class="PostCreate__addpicture-container">
                    <fa class="PostCreate__addpicture-delete" icon="fa-solid fa-xmark" @click="deletePicturePreview" />
                </div>
                    <img class="PostCreate__addpicture-preview" :src="url" alt="L'image que vous venez d'importer">
            </div>

            <div class='PostCreate__feature'> 
            
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

</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

export default {
    setup() {
        return {v$: useVuelidate()}
    }, 
    name: 'PostCreate',
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
            
        }
    },

    validations(){
        return {
            message: {
                required: helpers.withMessage('Votre message doit contenir au moins 2 caractères', required),
                minLength: helpers.withMessage( 'Votre message doit contenir au moins 2 caractères', minLength(2)),
            },

        }
    }, 

    mounted() {
        if (localStorage.user) {
            this.userInfos = JSON.parse(localStorage.user)
        };
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
                this.createPost();
               
            } else {
                if (this.v$.message.required.$invalid === true)
                this.showValidatorError = true;

                if (this.v$.message.minLength.$invalid === true)
                this.showLengthError = true;
            }
        },

        createPost() {
            const dataForm = new FormData();
            dataForm.append('image', this.file);
            dataForm.append('message', this.message);
            this.$store.dispatch('createPost', dataForm)
                .then((response) => {
                    window.location.reload();

                })
                .catch((error) => {
                    const multerError = error.response.data.split(`Error: `);
                    const multerError2 = multerError[1].split(`<br> &nbsp; `);

                    this.multerErrorMessage = multerError2[0];
                    if (this.multerErrorMessage === 'File too large') {
                        this.multerErrorMessage = 'Le fichier est supérieur à 1mo'
                    };
                    
                    this.showMulterErrorMessage = true;
                    this.hideErrorContent();
                })
        },
        deletePicturePreview() {
            this.url = null;
            this.file = null;
            this.files = false;

        }, 
        hideError(){
            this.showValidatorError = false;
            this.showLengthError = false; 
            
        },
        hideErrorContent() {
            if (this.multerErrorMessage != '') {
                this.files = false
            }

        }, 
    },

    computed: {
        totalCharacters() {
            return this.message.length;
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
    max-width: 600px;
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
        position: relative;
        justify-content: center;
        margin-bottom: 15px;

        &-container{
            display: flex;
            justify-content: flex-end;
            
        }

        &-preview {
            object-fit: cover;
            width: 100%;
            max-height: 600px;
            padding: 20px (60px)
        }

        &-delete {
            margin-right: 30px;
            
            
            font-size: 25px;
            color: $color-tertiary;

            &:hover {
                cursor: pointer;
                color: #2D3043;

            }
        }
    }

    &__feature {
        @include PostController; 
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