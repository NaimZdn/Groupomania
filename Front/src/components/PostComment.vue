<template>
<transition name="slide2" appear> 
    <div class="PostComment">

        <div class="PostComment__picture">
            <a href=""> <img id="userPicture" class="PostComment__picture-user" src="../assets/images/Photo CV.jpg"> </a>
        </div>

        <div class="PostComment__content">
            <p id="userPseudo" class="PostComment__content-pseudo"> {{pseudo}}</p>
            <p id="userComment" class="PostComment__content-comment"> {{comment}} </p>
        </div>

    </div>
</transition>
</template>

<script>
export default {
    name: "PostComment",
    props: ['comment', 'pseudo']

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

        @include break-mobile{
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

        &-pseudo, &-comment {
            margin: 0 0 20px 0; 

            &:nth-child(1) {
            font-weight: 600;

            }
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


