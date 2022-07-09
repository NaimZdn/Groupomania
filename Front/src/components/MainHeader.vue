<script>
export default {
    name: 'MainHeader',
}
</script>

<template>
    <header>
        <nav class="MainHeader">

            <div class="MainHeader__logo">
                <img class="MainHeader__logo-desktop" src="../assets/images/Logo_red.png" alt="Logo Groupomania version Desktop">
                <img class="MainHeader__logo-mobile" src="../assets/images/Groupomania-logo_mobile.png" alt="Logo Groupomania version mobile">
            </div>

            <div class="MainHeader__profil">
                <router-link class="MainHeader__anchor" to="./profil">
                    <img id="userPicture" class="MainHeader__anchor-picture" src="../assets/images/Photo CV.jpg" alt="Photo de profil de l'utilisateur connecté">
                </router-link>

            </div>

        </nav>

    </header>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.MainHeader {
    background-color: white;
    padding: 15px 0 15px 0;
    box-shadow: 0px 3px 8px rgb(154, 57, 38, 40%);
    display: flex;
    align-items: center;
    flex-basis: 100%;

    &__logo {
        flex-basis: 50%;

        &-desktop {
            height: 30px;
            margin-left: 50px;

            @include break-mobile {
                display: none;

            }
        }

        &-mobile {
            display: none;

            @include break-mobile {
                height: 40px;
                margin-left: 15px;
                display: block;

            }
        }
    }

    &__profil {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        align-items: center;
        flex-basis: 50%;

    }

    &__anchor {
        text-decoration: none;
        min-height: 50px;
        min-width: 50px;
        height: 50px;
        width: 50px;
        margin-right: 50px;

        @include break-mobile {
            margin-right: 15px;
        }

        &-picture {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 50%;

        }

    }
}
</style>