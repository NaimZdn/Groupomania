<script>
export default {
    name: 'PostCreate',
}
</script>

<template>
    <section class="container-flex">
      <div class="PostCreate">

        <div class="PostCreate__form">
          <div class="PostCreate__picture">
            <img id="userPicture" class="PostCreate__picture-user" src="../assets/images/Photo CV.jpg" alt="Photo de profil de l'utilisateur connecté">
          </div>
          <span id="createComment" class="PostCreate__comment" role="textbox" contenteditable></span>
        </div>

        <div class="PostCreate__send">
          <label for="file-upload" class="PostCreate__import-file"> <fa icon="fa-solid fa-image" /> </label>
          <input id="fileUpload" type="file">
          <button id="postCreate" class="PostCreate__button">PUBLIER</button>
        </div>
      </div>
    </section>
</template>

<style lang='scss'>
@import "../assets/sass/main.scss"; 

@include ContainerFlex;

.PostCreate {

    background-color: white;
    margin: 60px 0 30px 0;
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
        margin: 30px 0 0 30px; 

        @include break-mobile {
            margin: 30px 15px 0 15px; 

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
        @include input-add;

        @include break-mobile {
            margin: 0;

        }
        
        &[contenteditable]:empty::before {
            content: "Ajoutez un post";
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

        & .fa-image {
            font-size: 25px;
            color: $color-primary;
        }
    }

    &__button {
        @include send-button; 

    }
}

label[for="file-upload"] {

    cursor: pointer;
    margin-right: 20px;
    padding: 5px 8px 3px 8px;

    &:hover {
        background-color: rgb($color-secondary, 0.5);
        border-radius: 30px;
        animation: bubble 0.5s;

    }
}

#fileUpload {
    display: none;
}
</style>