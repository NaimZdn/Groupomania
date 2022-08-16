<template>
    <header>
        <nav class="MainHeader">

            <router-link to="/mainpage">
                <div class="MainHeader__logo">
                    <img class="MainHeader__logo-desktop" src="../assets/images/Logo_red.png"
                        alt="Logo Groupomania version Desktop">
                    <img class="MainHeader__logo-mobile" src="../assets/images/Groupomania-logo_mobile.png"
                        alt="Logo Groupomania version mobile">
                </div>
            </router-link>

            <div class="MainHeader__profil">
                <div class="MainHeader__anchor" @click="showOption = true">
                    <img id="userPicture" class="MainHeader__anchor-picture" :src="this.user.picture || this.userInfos.picture" alt="Votre photo de profil">
                </div>

                <transition name=OptionFade appear>
                    <div class="MainHeader__option-content" v-if="showOption" @click="showOption = true">
                        <div class="MainHeader__option-button">

                            <router-link to="/profil">
                                <div class="MainHeader__option-profil">
                                    <fa class="MainHeader__option-profil-icon" icon="fa-solid fa-user" />
                                    <span class="MainHeader__option-profil-text"> Mon profil </span>
                                </div>
                            </router-link>

                            <div class="MainHeader__option-modification" @click="disconnectUser">
                                <fa class="MainHeader__option-modification-icon"
                                    :icon="['fas', 'arrow-right-from-bracket']" />
                                <span class="MainHeader__option-modification-text"> Se déconnecter </span>
                            </div>

                        </div>
                    </div>
                </transition>
            </div>

            <div class="MainHeader__option-bg" v-if="showOption" @click="showOption = false"> </div>

        </nav>
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'MainHeader',
    props: ['picture'], 

    data() {
        return {
            userInfos: [],
            showOption: false,
            
        }
    },

    mounted() {
        if(localStorage.user) {
            this.userInfos = JSON.parse(localStorage.getItem('user'))
        }
           
        
    },

    methods: {
        disconnectUser() {
            this.$store.dispatch('disconnectUser')
                .then((response) => {
                    this.$router.push("/")

                })
                .catch((error) => {
                    console.log('error')
                })
        }
    },

    computed: {
        ...mapState({
            user: 'userInfos'
        })
    }




}
</script>

<style lang="scss">
@import "../assets/sass/main.scss";

.MainHeader {
    background-color: white;
    padding: 15px 0 15px 0;
    box-shadow: 0px 3px 8px rgb(154, 57, 38, 40%);
    display: flex;
    align-items: center;
    flex-basis: 100%;
    position: fixed;
    width: 100%;
    z-index: 1000;

    &__logo {
        flex-basis: 25%;

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
        position: relative;

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
            cursor: pointer;

        }
    }

    &__option {

        &-content {
            position: absolute;
            bottom: -230%;
            right: 0%;
            transform: translate(-50%, -50%);
            z-index: 99;
            flex-direction: column;
            display: flex;
            min-width: 10%;
            background-color: white;
            border-radius: 6px;
            box-shadow: $primary-shadow;

            @include break-mobile {
                bottom: -225%;
                right: -8%;
                margin: 0px
            }
        }

        &-button {
            display: flex;
            flex-direction: column;
            gap: 5px;

        }

        &-profil {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            padding: 10px 70px 5px 8px;
            cursor: pointer;
            color: $color-tertiary;

            &:hover {
                background-color: whitesmoke;
                color: #2D3043;

            }

            &-icon {
                font-size: 20px;
                padding-right: 10px;

            }

            &-text {
                font-size: 16px;
                font-weight: bold;

            }
        }

        &-modification {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            padding: 5px 5px 10px 8px;
            cursor: pointer;
            color: $color-tertiary;

            &:hover {
                background-color: whitesmoke;
                color: #2D3043;

            }

            &-icon {

                font-size: 18px;
                padding-right: 10px;

            }

            &-text {
                font-size: 16px;
                font-weight: bold;

            }
        }

        &-bg {
            position: fixed;
            inset: 0;
            z-index: 98;
            background-color: rgba(0, 0, 0, 0);

        }
    }
}

@include Fade;
</style>