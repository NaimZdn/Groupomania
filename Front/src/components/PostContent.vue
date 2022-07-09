<script>
export default {
    name: "PostContent",

}
</script>

<template>
    <div class="PostContent__header">

        <div class="PostContent__picture">
            <a href=""> <img id="userPicture" class="PostContent__picture-user" src="../assets/images/Photo CV.jpg"> </a>
        </div>

        <div class="PostContent__info">
            <h2 id="userPseudo" class="PostContent__info-user">Pseudo</h2>
            <p id="postDate" class="PostContent__info-date"> 14 juin 2022 à 15h00</p>
        </div>

        <div class="PostContent__option">
            <fa id="postOption" class="PostContent__option-icon" icon="fa-solid fa-gear" />
        </div>
    </div>

    <div class="PostContent__content">
        <p id="postText" class="PostContent__content-text">Yo, voici ma nouvelle création. N'hésitez pas à lacher un like les bg !  </p>
        <img id="postPicture" class="PostContent__content-picture" src="../assets/images/Geometric abstract-02.jpg" alt="Image posté par 'pseudo de l'utilisateur'">
    </div>

    <div class="PostContent__footer">
        <div id="showComment" class="PostContent__comment">
            <fa class="PostContent__comment-icon" icon="fa-solid fa-comment-dots" />
            <span class="PostContent__comment-number"> 7 </span>
        </div>

        <div id="addLike" class="PostContent__like">
            <fa class="PostContent__like-icon" icon="fa-solid fa-thumbs-up" />
            <span class="PostContent__like-number"> 5 </span>
        </div>
    </div>



</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.PostContent {

    &__header {
        display: flex;
        flex-basis: 100%;
        position: relative;
        margin: 30px; 

         @include break-mobile {
            margin: 30px 15px 30px 15px;
        }

    }

    &__picture {
        @include profil-picture__container;

        &-user {
            @include profil-picture;

        }
    }

    &__info {
        padding-left: 20px;
        flex: 75%;

        &-user {
            font-size: 16px;
            margin: 0px;

        }

        &-date {
            margin: 8px 0 0 0;
            color: rgba(0, 0, 0, 0.54);
            font-size: 14px;

        }
    }

    &__option {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        &-icon {
            font-size: 20px;
            color: $color-primary;

            &:hover {
                animation: bubble 0.5s;
                cursor: pointer;
            }
        }
    }

    &__content {

        &-text {
            margin: 25px 30px 25px 30px;
            border-left: 3px solid $color-primary;
            line-height: 30px;
            padding-left: 10px;

            @include break-mobile {
                margin: 25px 15px 25px 15px;
            }
        }

        &-picture {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border: 2px solid rgb($color-secondary, 0.5);

        }
    }

    &__footer {
        display: flex;
        margin: 15px 30px 15px 30px;
        justify-content: center;

        @include break-mobile {
            margin: 15px
        }
    }

    &__comment {
        @include CommentOrLike__button;

    }

    &__like {
        @include CommentOrLike__button;

    }
}
</style>