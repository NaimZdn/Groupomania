<template>
    <div class="PostCreateComment__content">
    <div class="PostCreateComment__line"> </div>
    </div>

    <div class="PostCreateComment">
        <div class="PostCreateComment__picture line ">
            <img id="userPicture" class="PostCreateComment__picture-user" :src="userInfos.picture" alt="Votre photo de profil"> 
        </div>
        <span id="createComment" class="PostCreateComment__form" role="textbox" contenteditable></span>
    </div>

    <div class="PostCreateComment__button">
        <button id="commentCreateButton" class="PostCreateComment__button-send">PUBLIER</button>
    </div>
</template>

<script>
export default {
    name: 'PostCreateComment', 

       data() {
    return {
        userInfos: '', 

    }
   }, 
      mounted() {
        if (localStorage.user) {
            this.userInfos = JSON.parse(localStorage.user)
            //console.log(this.userInfos)
        }
    },
}
</script>

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

    &__content {
        display: flex;
        justify-content: center;
    }


    &__picture {
        @include profil-picture__container;

        &-user {
            @include profil-picture;

        }
    }

    &__form {
        @include input-add;
        margin: 20px 0px 30px 0; 
  
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