<template>
    <section class="container-flex">
        <div class="PostCreate">

            <div class="PostCreate__form">
                <div class="PostCreate__picture">
                    <img class="PostCreate__picture-user" :src="this.userInfos.picture" alt="Votre photo de profil">
                </div>
                <textarea class="PostCreate__comment" ref='textarea' role="textbox" placeholder="Ajoutez un post"
                    maxlength="300" v-model='message' @input="resizeTextarea()"></textarea>
            </div>

            <div v-if="files" class="PostCreate__addpicture">
                <img class="PostCreate__addpicture-preview" :src="url">
                <fa class="PostCreate__addpicture-delete" icon="fa-solid fa-xmark" @click="deletePicturePreview" />
            </div>

            <span class="PostCreate__counter"> {{ totalCharacters }}/300 caractères</span>

            <div class="PostCreate__send">
                <label class="PostCreate__import-file" aria-label="Cliquez pour importer votre image">
                    <fa icon="fa-solid fa-image" />
                    <input class="PostCreate__input" type="file" aria-label="Importez votre image" @change="changeFile">
                </label>
                <button class="PostCreate__button" @click="createPost">PUBLIER</button>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
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

        createPost() {
            const dataForm = new FormData();
            dataForm.append('image', this.file);
            dataForm.append('message', this.message);
            this.$store.dispatch('createPost', dataForm)
                .then((response) => {
                    console.log('réponse du serveur')
                    //this.displayModification = false

                })
                .catch((error) => {
                    console.log('error aie aie ')
                    //console.log(this.bio)
                })
        },
        deletePicturePreview() {
            this.url = null;
            this.file = null;
            this.files = false;

        }

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
        @include input-add;

        @include break-mobile {
            margin: 0;

        }

        &::placeholder {
            font-size: 14px;
            font-weight: bold;
            color: $color-primary;
        }
    }

    &__addpicture {
        display: flex;
        justify-content: center;
        margin-bottom: 15px;

        &-preview {
            object-fit: cover;
            width: 100%;
            height: 300px;
        }

        &-delete {
            position: relative;
            right: 30px;
            font-size: 25px;
            color: $color-tertiary;

            &:hover {
                cursor: pointer;
                color: #2D3043;

            }

        }

    }

    &__counter {
        margin-left: 100px;
        margin-top: 20px;
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
        margin: 20px 30px 0 0;

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