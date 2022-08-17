<template>
    <main class="container">
        <section class="LoginMain">

            <div class="LoginMain__illustration ">
                <img class="LoginMain__illustration-picture" src="../assets/images/Illustration-login.png" alt="Illustration Login">
            </div>

            <div class="LoginMain__form">
                <h1 class="LoginMain__form-header"> S'identifier </h1>

                <div class="LoginMain__input">
                    <input @click='this.emailError = false' class="LoginMain__input-type" type="mail" placeholder="Email" aria-label="Entrez votre adresse mail" v-model="email">
                    <fa class="LoginMain__input-mail" icon="fa-solid fa-at" />

                    <div class="LoginMain__input-container" v-if="v$.email.$error">
                        <fa class="LoginMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="LoginMain__input-container-error"> Veuillez entrer une adresse mail valide </span>
                    </div>
 
                    <div class="LoginMain__input-container" v-if="emailError === true">
                        <fa class="LoginMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="LoginMain__input-container-error"> {{errorMessageText}}</span>
                    </div>
            
                </div>

                <div class="LoginMain__input">
                    <input v-if='!showPassword' @click='this.passwordError = false' class="LoginMain__input-type" type='password' placeholder="Mot de passe" aria-label="Entrez votre mot de passe" v-model="password">
                    <input v-if='showPassword' @click='this.passwordError = false' class="LoginMain__input-type" type='text' placeholder="Mot de passe" aria-label="Entrez votre mot de passe" v-model="password">
                    <fa class="LoginMain__input-password" icon="fa-solid fa-lock" />
                    <fa v-if='showPassword' @click="toggleShow" class="LoginMain__input-show" icon="fa-solid fa-eye" />
                    <fa v-if='!showPassword' @click="toggleShow" class="LoginMain__input-hide" icon="fa-solid fa-eye-slash" />

                    <div class="LoginMain__input-container" v-if="v$.password.$error">
                        <fa class="LoginMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="LoginMain__input-container-error"> Veuillez entrer un mot de passe valide </span>
                    </div>

                    <div class="LoginMain__input-container" v-if="passwordError === true">
                        <fa class="LoginMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="LoginMain__input-container-error"> {{errorMessageText}}</span>
                    </div>

                </div>

                <div class="LoginMain__button">
                    <button class="LoginMain__button-login" @click="submitForm"> Se connecter </button>
                </div>

            </div>
        </section>

            <section class="LoginMain__popup">
                <transition name=OptionFade appear>
                    <div class="LoginMain__popup-content" v-if="popupError">
                        <div class="LoginMain__popup-button">

                            <div class="LoginMain__popup-profil">
                                <fa class="LoginMain__popup-profil-icon" icon="fa-solid fa-circle-xmark" />
                                <span class="LoginMain__popup-profil-text"> L'identification a échouée.<br>{{errorMessageText}}</span>
                                <fa class="LoginMain__popup-profil-close" icon="fa-solid fa-xmark" @click="popupError = false" />
                            </div>

                        </div>
                    </div>
                </transition>
            </section>
    </main>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

const regexPassword = helpers.regex(/^[A-z0-9éèôöîïûùü' -/*]{8,}$/);

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    name: "LoginMain",
    data() {
        return {
            email: "",
            password: "",
            error: null,
            popupError: false,
            errorMessageText: '', 
            emailError: false, 
            passwordError: false, 
            showPassword: false, 

        };
    },

    validations() {
        return {
            email: { required, email },
            password: {
                required,
                regexPassword,

            },
        }
    },

    methods: {
        submitForm() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.login();
       
            }; 
        },
        login: function () {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
                
            }).then((response) => {
                this.$router.push("/mainpage") 
                
            }).catch((error) => {
                const errorMessageText1 =  JSON.stringify(error.response.data).split('{"error":"')
                const errorMessageText2 = errorMessageText1[1].split(' "}')
                this.errorMessageText = errorMessageText2[0]
                this.showErrorMessage()
                this.popupError = true; 
                this.delayCloseAlert()     
            });
        }, 
        showErrorMessage() {
            if (this.errorMessageText === "Utilisateur introuvable"){
                this.emailError = true; 
                this.passwordError = false;

            } else if (this.errorMessageText === "Mot de passe invalide") {
                this.passwordError = true;
                this.emailError = false;

            }; 
        }, 
        delayCloseAlert() {
            var self = this;
            setTimeout(function () { self.popupError = false }, 7000);

        },
        toggleShow(){
            this.showPassword = !this.showPassword; 
        }
    },
};

</script>

<style lang="scss">
@import "../assets/sass/main.scss";

@include Container;

.LoginMain {
    display: flex;
    margin: 0px 30px 0px 30px;
    flex-direction: row-reverse;
    position: relative;

    @include break-tablet {
        justify-content: center;
    }

    @include break-mobile {
        margin: 0 15px 0px 15px;

    }

    &__illustration {
        width: 50%;
        display: flex;
        align-items: center;
        height: 600px;
        justify-content: flex-end;

        @include break-tablet {
            display: none;
        }

        &-picture {
            max-width: 100%;
            max-height: 100%;
        }
    }

    &__form {
        flex-direction: column;
        position: relative;
        width: 50%;

        @include break-tablet {
            display: flex;
            justify-content: center;
            margin: 0px;
            width: 70%;
        }

        @include break-mobile {
            width: 100%;
        }

        &-header {
            text-align: center;
            color: $color-primary;
            font-size: 48px;
            margin: 30px 0 50px 0;

            @include break-mobile {
                font-size: 30px;
                margin-bottom: 30px;
            }
        }
    }

    &__input {
        position: relative;

        &-type {
            @include LogInput;

        }

        &-mail {
            @include MailInput;
        }

        &-password {
            @include PasswordInput;

        }
        &-container {
            @include InputController; 

        }
        @include ShowPassword; 

    }

    &__button {
        display: flex;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 30px;

        &-login {
            @include LogButton;

        }
    }

    &__popup {
          @include PopupMessage;
        
    }
};
</style>