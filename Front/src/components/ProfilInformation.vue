<template>

    <div class="ProfilInformation">

        <div class="ProfilInformation__picture">
            <img id="userPicture" class="ProfilInformation__picture-user" :src="this.userData.picture" alt="Votre photo de profil">
        </div>

        <div class ="ProfilInformation__content">  

            <div class="ProfilInformation__pseudo">
                <h1 class="ProfilInformation__pseudo-text"> {{ this.userData.pseudo }} </h1>
                <p v-if="userData.isAdmin === true" class="ProfilInformation__pseudo-admin"> Admin </p>
            </div>

            <div class="ProfilInformation__bio"> 
                <p class="ProfilInformation__pseudo-bio"> {{ this.userData.bio }} </p>
            </div>
        </div>
    </div>

    <div class="ProfilInformationModification__button">
        <button class="ProfilInformationModification__button-modification" aria-label="Cliquez-ici pour modifier votre profil" @click="displayModification = true"> Modifier vos informations </button>
    </div>

    <transition name="slide" appear>
        <div class="ProfilInformationModification__content" v-if="displayModification">
            <div class="ProfilInformationModification__picture">
                <img v-if="files" class="ProfilInformationModification__picture-user" :src="userData.picture" alt="Votre photo de profil actuelle">
                <img v-if="url" class="ProfilInformationModification__picture-user" :src="url" alt="La photo de profil que vous venez d'importer">
            </div>

            <div class="ProfilInformationModification__send">
                <label class="ProfilInformationModification__import-file" aria-label="Cliquez pour importer votre image">
                    <fa icon="fa-solid fa-camera" />
                    <input class="ProfilInformationModification__input" type="file" accept="image/*" @change="changeFile">
                </label>
            </div>

            <div class="ProfilInformationModification__text">
                <textarea class="ProfilInformationModification__text-description" role="textbox" placeholder="Bio" maxlength="300" v-model='bioUpdateText' @input="resizeTextarea()" ref="textarea"> {{this.userData.bio}}</textarea>
                <span class="ProfilInformationModification__text-counter"> {{ totalCharacters }}/300 caractères</span>
                <div v-if='multerErrorMessage != ""' class="ProfilInformationModification__text-error"> 
                    <fa class="ProfilInformationModification__text-error-icon" icon="fa-solid fa-circle-xmark" />
                    <p class="ProfilInformationModification__text-error-text"> {{this.multerErrorMessage}} </p>
                </div>
            </div>

            <div class="ProfilInformationModification__save">
                <button class="ProfilInformationModification__save-modification" aria-label="Oui, je souhaite modifier mon profil" @click="updateUserProfil()"> Modifier </button>
                <button class="ProfilInformationModification__save-return" aria-label="Non, je ne souhaite pas modifier mon profil" @click="hideErrorMessage()"> Annuler </button>
            </div>

        </div>
        </transition>

        <section class="ProfilInformationModification__option">
            <transition name=OptionFade appear>
                <div class="ProfilInformationModification__option-content valid" v-if="validationMessage">
                    <div class="ProfilInformationModification__option-button">
                        <div class="ProfilInformationModification__option-profil">
                            <fa class="ProfilInformationModification__option-profil-icon" icon="fa-solid fa-circle-check" />
                            <span class="ProfilInformationModification__option-profil-text"> Votre profil a bien été modifié </span>
                             <fa class="ProfilInformationModification__option-profil-close" icon="fa-solid fa-xmark" @click="validationMessage = false" />
                        </div>
                    </div>
                </div>
            </transition>
        </section>

         <section class="ProfilInformationModification__option">
            <transition name=OptionFade appear>
                <div class="ProfilInformationModification__option-content" v-if="errorMessage">
                    <div class="ProfilInformationModification__option-button">
                        <div class="ProfilInformationModification__option-profil">
                            <fa class="ProfilInformationModification__option-profil-icon" icon="fa-solid fa-circle-xmark" />
                            <span class="ProfilInformationModification__option-profil-text"> Une erreur est survenue, veuillez réessayer </span>
                            <fa class="ProfilInformationModification__option-profil-close" icon="fa-solid fa-xmark" @click="errorMessage = false" />
                        </div>
                    </div>
                </div>
            </transition>
        </section>

    <transition name="fade" appear>
        <div class="ProfilInformationModification__bg" v-if="displayModification" @click="hideErrorMessage()"></div>
    </transition>

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "ProfilInformationModification",

    data() {
        return {
            displayModification: false,
            files: true,
            url: null,
            maxLength: 300,
            userData: [],
            validationMessage: false, 
            errorMessage: false, 
            multerErrorMessage: '', 
            bioUpdateText: '',

        }
    },

    mounted() {
        if (localStorage.user) {
            this.userData = JSON.parse(localStorage.user)
        };
        this.bioUpdateText = this.userData.bio;
    },

    methods: {
        changeFile(fileUpload) {
            this.file = fileUpload.target.files[0];
            this.url = URL.createObjectURL(this.file);
            this.files = false;

        },
        reloadStorage() {
            this.userData = JSON.parse(localStorage.getItem('user'));
            //console.log(this.userData)
            this.displayModification = false;

        },
        async updateUserProfil() {
            const dataForm = new FormData();
            dataForm.append('image', this.file);
            dataForm.append('bio', this.bioUpdateText);
            await this.$store.dispatch('updateUserProfil', dataForm)  
                .then((response) => {
                    this.validationMessage = true;
                    this.multerErrorMessage = ''; 
                    this.reloadStorage();
                }).catch((error) => {
                    const multerError = error.response.data.split(`Error: `);
                    const multerError2 = multerError[1].split(`<br> &nbsp; `);

                    this.multerErrorMessage = multerError2[0];
                    if (this.multerErrorMessage === 'File too large') {
                        this.multerErrorMessage = 'Le fichier est supérieur à 1mo'
                    };

                    this.displayPicture();
                    this.errorMessage = true;
                })
            this.delayCloseAlert()

        },
        resizeTextarea() {
            const element = this.$refs["textarea"];
            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";

        },
        delayCloseAlert() {
            var self = this;
            setTimeout(function() { 
                self.validationMessage = false; 
                self.errorMessage = false; 
            }, 7000);

        },
        displayPicture() {
            if (this.multerErrorMessage != '') {
                this.url = null;
                this.files = true;
            }
        }, 
        hideErrorMessage() {
            this.displayModification = false;
            this.multerErrorMessage = '';

        }

    },
    computed: {
        ...mapState({
            // userInfos: 'userInfos'
        }),

        totalCharacters() {
            return this.userData.bio.length
        }
    }
}


</script>

<style lang="scss">
@import '../assets/sass/main.scss';

.ProfilInformation {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;

    @include break-mobile{
        flex-direction: column;

    }

    &__picture {
        margin: 30px 0 30px 30px;
        height: 200px;
        width: 200px;
        min-height: 200px;
        min-width: 200px;
        border-radius: 100%;
        border: 4px solid $color-primary;
        
        

        @include break-mobile {
            margin-left: 0; 
            }

        &-user {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
            transition: .3s ease-in-out;

        }
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__pseudo {
        margin-left: 40px;    

        @include break-mobile {
            margin: 0 15px 0 15px; 
                                
        }
        
        &-text{
            font-weight: 400;
            margin: 40 0 40 0; 
            font-size: 40px;
            
            @include break-mobile {
                font-weight: 400;
                font-size: 30px;
                margin-top: 0;
                        
            } 
        }

        &-admin {
            font-size: 20px; 
            font-weight: bold; 
            padding: 7px 15px 7px 15px;
            background-color: $color-primary;
            border-radius: 10px;
            color: white; 
            
            @include break-mobile {
                margin-top: -10px;
                font-size: 15px;
                
            }
        }

        &-bio {
            border-left: 3px solid $color-primary;
            font-size: 16px;
            font-style: italic;
            padding-left: 10px; 
            margin-right: 30px;
            margin-left: 40px;

            @include break-mobile {                
                margin: 0 15px 0 15px; 
                text-align: center;
            }
        }
    }

    &__button {
        display: flex;
        justify-content: flex-end;
        margin: 10px 30px 30px 0; 

        @include break-mobile {
            justify-content: center;
            margin: 10px 0 30px 0;
    
        }

        &-modification {
            @include send-button;

            @include break-mobile {
                width: 100%;
                margin: 0 15px 0 15px;
            }
        }
    }
}

.ProfilInformationModification {

    &__button {

        display: flex;
        justify-content: flex-end;
        margin: 10px 30px 30px 0;

        @include break-mobile {
            justify-content: center;
            margin: 10px 0 30px 0;

        }

        &-modification {
            @include send-button;

            @include break-mobile {
                width: 100%;
                margin: 0 15px 0 15px;
            }
        }
    }

    &__bg {
        position: fixed;
        inset: 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }


    &__content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;

        flex-direction: column;
        display: flex;
        min-width: 500px;

        background-color: white;
        padding: 30px;
        border-radius: 6px;
        box-shadow: $primary-shadow;


        @include break-mobile {
            min-width: 25%;
            margin-top: 50px;


        }

        &-delete {

            @include send-button;
        }
    }

    &__picture {
        display: flex;
        justify-content: center;
        margin: 30px 15px 15px 15px;


        @include break-mobile {
            margin-left: 0;
        }


        &-user {

            height: 200px;
            width: 200px;
            min-height: 200px;
            min-width: 200px;

            object-fit: cover;
            border-radius: 100%;
            border: 4px solid $color-primary;
        }
    }

    &__text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: -50px;
        

        &-description {

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

        &-error {
            display: flex;
            align-items:center; 
            margin-top: 5px;
            
            font-size: 16px;
            color: $color-primary;
            font-weight: bold;

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

    &__save {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin: 15px 0 15px 0;

        @include break-mobile {
            margin: 0 15px 30px 0;
        }

        &-modification {
            @include send-button;
            background-color: $color-secondary;
            color: $color-primary;

            &:hover {
                background-color: #FED8D0;

            }
        }

        &-return {
            @include send-button;

        }
    }

    &__send {
        display: flex;
        position: relative;

        left: 272px;
        top: -65px;

        @include break-mobile {
            margin: 20px 15px 0 0;
            left: 155px;
            top: -82px
        }

    }

    &__import-file {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 10px;
        background-color: $color-secondary;
        border-radius: 100%;


        &:hover {

            animation: bubble 0.5s;

        }

        & .fa-camera {
            font-size: 25px;
            color: $color-primary;
        }
    }

    &__option {
        z-index: 1000; 
        @include PopupMessage; 
        
    }
};

.valid {
    background-color: #3CA95B;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;

}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform .5s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-50%) translateX(100vw);
}
</style>