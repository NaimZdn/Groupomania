<script>
export default {
    name: 'PostCreateComment'
}
</script>

<template>
    <div class="PostCreateComment">
        <div class="PostCreateComment__picture">
            <img id="userPicture" class="PostCreateComment__picture-user" src="../assets/images/Photo CV.jpg"> 
        </div>
        <span id="createComment" class="PostCreateComment__form" role="textbox" contenteditable></span>
    </div>

    <div class="PostCreateComment__button">
        <button id="commentCreateButton" class="PostCreateComment__button-send">PUBLIER</button>
    </div>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.PostCreateComment {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin: 0 30px 0 30px;
    align-items: center;

    @include break-mobile {
       margin: 0 15px 0 15px;
    }

    &__picture {
        @include profil-picture__container;

        &-user {
            @include profil-picture;

        }
    }

    &__form {
        @include input-add;
        margin: 30px 0px 30px 0; 
  
        &[contenteditable]:empty::before {
            content: "Ajoutez un commentaire";
            
        }
    }

    &__button{
        display: flex;
        justify-content: flex-end;
        margin: 0 30px 30px 0;
        
        @include break-mobile {
            margin: 0 15px 30px 0;
        }
        
        &-send {
            @include send-button;

        }
    }
}
</style>