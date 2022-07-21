<template>
    <main class="container">
        <section class="SignUpMain">

            <div class="SignUpMain__illustration">
                <img class="SignUpMain__illustration-picture" src="../assets/images/Illustration-sign-up.png"
                    alt="Illustration Sign-Up">
            </div>

            <div class="SignUpMain__form">
                <h1 class="SignUpMain__form-header"> Créez votre compte</h1>

                <div class="SignUpMain__input">
                    <input id="pseudoInput" class="SignUpMain__input-type" type="pseudo" placeholder="Pseudo"
                        aria-label="Entrez votre pseudo" v-model="pseudo" v-on:keydown="regex = false">
                    <fa class="SignUpMain__input-pseudo" icon="fa-solid fa-user" />
                    <span class="SignUpMain__input-error" v-if="v$.pseudo.$error"> Veuillez entrer un pseudo valide </span>
                </div>

                <div class="SignUpMain__input">
                    <input id="mailInput" class="SignUpMain__input-type" type="mail" placeholder="Email"
                        aria-label="Entrez votre adresse mail" v-model="email">
                    <fa class="SignUpMain__input-mail" icon="fa-solid fa-at" />
                    <span class="SignUpMain__input-error" v-if="v$.email.$error"> Veuillez entrer une adresse mail valide </span>
                </div>

                <div class="SignUpMain__input">
                    <input id="passwordInput" class="SignUpMain__input-type" type='password' placeholder="Mot de passe" aria-label="Entrez votre mot de passe" v-model="password">
                    <fa class="SignUpMain__input-password" icon="fa-solid fa-lock" />
                    <span class="SignUpMain__input-error" v-if="v$.password.$error"> Veuillez entrer un mot de passe correct </span>
                </div>

                <div class="SignUpMain__checkbox">
                    <input class="SignUpMain__checkbox-type" type="checkbox" aria-label="Veuillez accepter nos CGU" v-model="acceptTerms" @click="acceptTerms = true">
                    <span class="SignUpMain__checkbox-text"> J'accepte les <a class="SignUpMain__checkbox-cgu" href="#" aria-label="Nos CGU">conditions générales d'utilisations</a></span>
                </div>

                <span class="SignUpMain__input-error" v-if="v$.acceptTerms.$error"> Veuillez accepter nos conditions générales d'utilisations </span>

                <div class="SignUpMain__button">
                    <button class="SignUpMain__button-signup" @click="submitForm"> Créer mon compte </button>
                </div>

            </div>
        </section>
    </main>
</template>

<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

const regexPseudo = helpers.regex(/^[a-z0-9éèôöîïûùü' -]{2,20}$/);
const regexPassword = helpers.regex(/^[A-z0-9éèôöîïûùü' -/*]{8,}$/);

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    name: "SignUpMain",
    data() {
        return {
            pseudo: "",
            email: "",
            password: "",
            acceptTerms: false,
            error: null,
            popup: false,

        };
    },

    validations() {
        return {
            pseudo: {
                required,
                regexPseudo,

            },
            email: { required, email },
            password: {
                required,
                regexPassword,

            },

            acceptTerms: {
                required,
                checked: value => value === true

            }
        }
    },

    methods: {
        submitForm() {
            this.v$.$validate()
            if (!this.v$.$error) {
                alert("C'est carré ")
                const dataUser = {
                    pseudo: this.pseudo,
                    email: this.email,
                    password: this.password,
                };
                console.log(dataUser);
                axios
                    .post("http://localhost:3000/api/auth/signup", dataUser)
                    .then((response) => {
                        console.log(response.data);
                        this.popup = true;
                        //this.$router.push("/login");


                    })
                    .catch((error) => {
                        alert("L'Email et/ou le Pseudo est déjà utilisé");
                        console.log(error);
                    });
            } else {
                alert("Pas carré");
            }
        },
    },
};
</script>

<style lang="scss">
@import "../assets/sass/main.scss";

@include Container;

.SignUpMain {
    display: flex;
    margin: 30px 30px 0px 30px;
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

        @include break-tablet {
            display: none;
        }

        &-picture {
            max-width: 95%;
            max-height: 100%;

        }
    }

    &__form {
        @include LogForm;

    }

    &__input {
        position: relative;

        &-type {
            @include LogInput;

        }

        &-pseudo {
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
                animation: bubble 0.5s;

            }
        }

        &-mail {
            position: absolute;
            left: 26px;
            top: 38px;
            height: 33px;
            color: $color-primary;

            @include break-mobile {
                position: absolute;
                left: 27px;
                top: 38px;
                height: 30px;

            }

            &:hover {
                animation: bubble 0.5s;

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
                animation: bubble 0.5s;

            }
        }

        &-error {


            color: $color-tertiary;
            font-weight: bold;

            @include break-mobile {
                text-align: center;

            }
        }
    }

    &__checkbox {
        display: flex;
        align-items: center;
        margin: 16px 0 16px 0;

        @include break-mobile {
            justify-content: center
        }

        &-type {
            @include Checkbox;

        }

        &-text {
            padding-left: 10px;
            color: $color-primary;

            @include break-mobile {
                font-size: 14px;

            }

        }

        &-cgu {
            color: $color-primary;

            @include break-mobile {
                font-size: 14px;

            }

            &:hover {
                color: #821007;
            }
        }
    }

    &__button {
        display: flex;
        justify-content: center;
        margin-top: 32px;

        @include break-tablet {
            margin-top: 16px;
        }

        &-signup {
            @include LogButton;
            margin-bottom: 50px;

        }
    }
};
</style>