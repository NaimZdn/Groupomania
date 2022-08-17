<template>
    <main class="container">
        <section class="LoginMain">

            <div class="LoginMain__illustration ">
                <img class="LoginMain__illustration-picture" src="../assets/images/Illustration-login.png"
                    alt="Illustration Login">
            </div>

            <div class="LoginMain__form">
                <h1 class="LoginMain__form-header"> S'identifier </h1>

                <div class="LoginMain__input">
                    <input id="mailInput" @click='this.emailError = false' class="LoginMain__input-type" type="mail" placeholder="Email" aria-label="Entrez votre adresse mail" v-model="email">
                    <fa class="LoginMain__input-mail" icon="fa-solid fa-at" />
                    <div class="SignUpMain__input-container" v-if="v$.email.$error">
                        <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="SignUpMain__input-container-error"> Veuillez entrer une adresse mail valide </span>
                    </div>

                    
                    <div class="SignUpMain__input-container" v-if="emailError === true">
                        <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="SignUpMain__input-container-error"> {{this.errorMessage}}</span>
                    </div>

                    
                </div>

                <div class="LoginMain__input">
                    <input id="passwordInput" @click='this.passwordError = false' class="LoginMain__input-type" type='password' placeholder="Mot de passe" aria-label="Entrez votre mot de passe" v-model="password">
                    <fa class="LoginMain__input-password" icon="fa-solid fa-lock" />

                    <div class="SignUpMain__input-container" v-if="v$.password.$error">
                        <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="SignUpMain__input-container-error"> Veuillez entrer un mot de passe valide </span>
                    </div>

                    <div class="SignUpMain__input-container" v-if="passwordError === true">
                        <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="SignUpMain__input-container-error"> {{this.errorMessage}}</span>
                    </div>

                    
                </div>

                <div class="LoginMain__button">
                    <button id="logButton" class="LoginMain__button-login" @click="submitForm"> Se connecter </button>
                </div>

            </div>
        </section>

        <section class="test">
            <transition name=OptionFade appear>
                <div class="LoginMain__option-content" v-if="popup">
                    <div class="LoginMain__option-button">

                        <router-link to="/profil">
                            <div class="LoginMain__option-profil">
                                <fa class="LoginMain__option-profil-icon" icon="fa-solid fa-circle-xmark" />
                                <span class="LoginMain__option-profil-text"> L'identification a échouée.<br>{{errorMessage}} </span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </transition>

            <div class="LoginMain__option-bg" v-if="popup" @click="popup = false"> </div>
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
            popup: false,
            errorMessage: '', 
            emailError: false, 
            passwordError: false, 

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
                console.log(response.data);
                
            })
                .catch((error) => {
                    const errorMessage1 =  JSON.stringify(error.response.data).split('{"error":"')
                    const errorMessage2 = errorMessage1[1].split(' "}')
                    this.errorMessage = errorMessage2[0]
                    this.showErrorMessage()
                    this.popup = true;
                    
                })
        }, 
        showErrorMessage() {
            if (this.errorMessage === "Utilisateur introuvable"){
                console.log('cc')
                this.emailError = true; 
                this.passwordError = false 

            }
            else if (this.errorMessage === "Mot de passe invalide") {
                this.passwordError = true;
                this.emailError = false; 

            }; 
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
                margin-bottom: 30px
            }
        }
    }

    &__input {
        position: relative;

        &-type {
            @include LogInput;

        }

        &-mail {
            position: absolute;
            left: 20px;
            top: 38px;
            font-size: 35px;
            color: $color-primary;

            @include break-mobile {
                position: absolute;
                left: 20px;
                top: 38px;
                height: 35px;

            }

            &:hover {
                animation: bubble 0.5s
            }
        }

        &-password {
            position: absolute;
            left: 27px;
            top: 38px;
            height: 30px;
            color: $color-primary;

            @include break-mobile {
                position: absolute;
                left: 27px;
                top: 38px;
                height: 30px;
            }

            &:hover {
                animation: bubble 0.5s
            }
        }
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

    &__option {

        &-content {
            display: flex;
            gap: 70px;
            width: 100%;


            z-index: 99;
            flex-direction: column;
            display: flex;
            min-width: 10%;
            max-width: 400px;
            background-color: $color-primary;
            border-radius: 6px;
            box-shadow: $primary-shadow;

            @include break-tablet {
                bottom: -211px;
                left: 0;
                margin: 0px;

            }

            @include break-mobile {
                bottom: -193px;
                left: 0;
                margin: 0px;

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
            align-items: center;
            width: 100%;
            padding: 20px;
            cursor: pointer;
            color: white;

            &-icon {

                font-size: 30px;
                padding-right: 20px;

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
};

.test {
    display: flex;
    margin: 0px 30px 0px 30px;
    position: fixed;
    bottom: 15px;

    @include break-tablet {
        bottom: 15px;
    }

};
</style>