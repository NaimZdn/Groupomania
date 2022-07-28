<template>

<div class="ProfilInformationModification__button">
    <button id="modificationButton" class="ProfilInformationModification__button-modification" @click="displayModification = true "> Modifier vos informations </button>
</div>

<transition name="fade" appear>
<div class="ProfilInformationModification__bg" v-if="displayModification" @click="displayModification = false"> </div>
</transition>

<transition name="slide" appear>
    <div class="ProfilInformationModification__content" v-if="displayModification"> 
         <div class="ProfilInformationModification__picture">
            <img id="userPicture" class="ProfilInformationModification__picture-user" src="../assets/images/Photo CV.jpg">
        </div>

         <div class="ProfilInformationModification__send">
            <label for="file-upload" class="ProfilInformationModification__import-file"> <fa icon="fa-solid fa-camera" /> </label>
            <input id="fileUpload" class="ProfilInformationModification__input" type="file" name="file"> 
        </div>


        <div class="ProfilInformationModification__text"> 
            <span id="createComment" class="ProfilInformationModification__text-pseudo" role="textbox" contenteditable></span>
            <span id="createComment" class="ProfilInformationModification__text-description" role="textbox" contenteditable></span>
        </div>

        <div class="ProfilInformationModification__save"> 
            <button class="ProfilInformationModification__save-modification"> Modifier </button>
            <button class="ProfilInformationModification__save-return" @click="displayModification = false"> Annuler </button>
        </div>
    </div>
</transition>



</template>

<script>
    export default {
        name: "ProfilInformationModification",

        data () {
            return {
                displayModification: false, 
                

            }
        },

    }

    
</script>

<style lang="scss">
@import '../assets/sass/main.scss'; 


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

        &-pseudo {
                    
        @include input-add;
         margin: 10px 0px 15px 0; 

            @include break-mobile {
                margin: -10px 0px 15px 0; 

            }

            &[contenteditable]:empty::before {
                content: "Nom";
                    
            } 
        }

        &-description {
                    
        @include input-add;
        margin: 15px 0px 15px 0; 

            &[contenteditable]:empty::before {
                content: "À propos de moi";
                    
            }
        }
    }

    &__save{
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin: 15px 0 15px 0; 
        
        @include break-mobile {
            margin: 0 15px 30px 0;
        }
        
        &-modification{
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