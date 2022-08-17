<template>
    <main class="container">
        <section class="SignUpMain">

            <div class="SignUpMain__illustration">
                <img class="SignUpMain__illustration-picture" src="../assets/images/Illustration-sign-up.png" alt="Illustration Sign-Up">
            </div>

            <div class="SignUpMain__form">
                <h1 class="SignUpMain__form-header"> Créez votre compte</h1>

                <div class="SignUpMain__input">
                    <input id="pseudoInput" class="SignUpMain__input-type" type="pseudo" placeholder="Pseudo" aria-label="Entrez votre pseudo"  maxlength="20" v-model="pseudo" v-on:keydown="regex = false">
                    <fa class="SignUpMain__input-pseudo" icon="fa-solid fa-user" />
                    <div class="SignUpMain__input-container" v-if="v$.pseudo.$error">
                        <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="SignUpMain__input-error"> Veuillez entrer un pseudo valide </span>
                    </div>
                </div>

                <div class="SignUpMain__input">
                    <input id="mailInput" class="SignUpMain__input-type" type="mail" placeholder="Email" aria-label="Entrez votre adresse mail" maxlength="70" v-model="email">
                    <fa class="SignUpMain__input-mail" icon="fa-solid fa-at" />
                    <div class="SignUpMain__input-container" v-if="v$.email.$error">
                        <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="SignUpMain__input-error"> Veuillez entrer une adresse mail valide </span>
                    </div>
                </div>

                <div class="SignUpMain__input">
                    <input v-if='!showPassword' class="SignUpMain__input-type" type='password' placeholder="Mot de passe" aria-label="Entrez votre mot de passe" name='password' maxlength="52" v-model="password" @input="showScopInput = true">
                    <input v-if='showPassword' class="SignUpMain__input-type" type='text' placeholder="Mot de passe" aria-label="Entrez votre mot de passe" name='password' maxlength="52" v-model="password" @input="showScopInput = true">
                    <fa v-if='showPassword' @click="toggleShow" class="SignUpMain__input-show" icon="fa-solid fa-eye" />
                    <fa v-if='!showPassword' @click="toggleShow" class="SignUpMain__input-hide" icon="fa-solid fa-eye-slash" />
                    <fa class="SignUpMain__input-password" icon="fa-solid fa-lock" />

                    <div v-if='showScopInput === true'>
                        <div class="SignUpMain__input-container"
                            v-if="v$.password.regexPassword.$invalid || this.password === ''">
                            <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                            <p class="SignUpMain__input-container-error"> {{ v$.password.regexPassword.$message }} </p>
                        </div>

                        <div class="SignUpMain__input-container"
                            v-if="!v$.password.regexPassword.$invalid && this.password != ''">
                            <fa class="SignUpMain__input-container-icon validContains" icon="fa-solid fa-circle-check" />
                            <p class="SignUpMain__input-container-error validContains"> Le mot de passe contient au moins 8 caractères </p>
                        </div>

                        <div class="SignUpMain__input-container" v-if="v$.password.containsUppercase.$invalid">
                            <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                            <p class="SignUpMain__input-container-error"> {{ v$.password.containsUppercase.$message }}
                            </p>
                        </div>

                        <div class="SignUpMain__input-container" v-if="!v$.password.containsUppercase.$invalid">
                            <fa class="SignUpMain__input-container-icon validContains" icon="fa-solid fa-circle-check" />
                            <p class="SignUpMain__input-container-error validContains"> Le mot de passe contient une majuscule </p>
                        </div>

                        <div class="SignUpMain__input-container" v-if="v$.password.containsLowercase.$invalid">
                            <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                            <p class="SignUpMain__input-container-error"> {{ v$.password.containsLowercase.$message }}
                            </p>
                        </div>

                        <div class="SignUpMain__input-container" v-if="!v$.password.containsLowercase.$invalid">
                            <fa class="SignUpMain__input-container-icon validContains" icon="fa-solid fa-circle-check" />
                            <p class="SignUpMain__input-container-error validContains"> Le mot de passe contient une minuscule </p>
                        </div>

                        <div class="SignUpMain__input-container" v-if="v$.password.containsNumber.$invalid">
                            <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                            <p class="SignUpMain__input-container-error"> {{ v$.password.containsNumber.$message }} </p>
                        </div>

                        <div class="SignUpMain__input-container" v-if="!v$.password.containsNumber.$invalid">
                            <fa class="SignUpMain__input-container-icon validContains" icon="fa-solid fa-circle-check" />
                            <p class="SignUpMain__input-container-error validContains"> Votre message contient un chiffre </p>
                        </div>
                    </div>
                </div>

                <div class="SignUpMain__checkbox">
                    <input class="SignUpMain__checkbox-type" type="checkbox" aria-label="Veuillez accepter nos CGU" v-model="acceptTerms" @click="acceptTerms = true">
                    <span class="SignUpMain__checkbox-text"> J'accepte les <a class="SignUpMain__checkbox-cgu" href="#" aria-label="Nos CGU">conditions générales d'utilisations</a></span>
                </div>

                <div class="SignUpMain__input-container" v-if="v$.acceptTerms.$error">
                    <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                    <span class="SignUpMain__input-container-error"> Veuillez accepter nos conditions générales d'utilisations </span>
                </div>

                <div class="SignUpMain__button">
                    <button class="SignUpMain__button-signup" @click="submitForm()"> Créer mon compte </button>
                </div>

            </div>

            <section class="SignUpMain__error">
                <transition name=OptionFade appear>
                    <div class="SignUpMain__error-content" v-if="errorMessage">
                        <div class="SignUpMain__error-button">

                            <div class="SignUpMain__error-profil">
                                <fa class="SignUpMain__error-profil-icon" icon="fa-solid fa-circle-xmark" />
                                <span class="SignUpMain__error-profil-text"> L'inscription a échoué, le pseudo et/ou l'adresse Mail est déjà utilisé </span>
                                <fa class="SignUpMain__error-profil-close" icon="fa-solid fa-xmark" @click="errorMessage = false" />
                            </div>

                        </div>
                    </div>
                </transition>
            </section>

            <section class="SignUpMain__error">
                <transition name=OptionFade appear>
                    <div class="SignUpMain__error-content valid" v-if="validMessage" @click="pushToLoginPage()">
                        <div class="SignUpMain__error-button">

                            <div class="SignUpMain__error-profil">
                                <fa class="SignUpMain__error-profil-icon" icon="fa-solid fa-circle-check" />
                                <span class="SignUpMain__error-profil-text"> Votre compte a bien été crée <br>
                                    Cliquez-ici pour vous connecter </span>
                                <fa class="SignUpMain__error-profil-close" icon="fa-solid fa-xmark"
                                    @click="errorMessage = false" />
                            </div>

                        </div>
                    </div>
                </transition>
            </section>

        </section>
    </main>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { containsUppercase, containsLowercase, containsNumber } from "./regexSignUp.js"

const regexPseudo = helpers.regex(/^[A-z0-9éèôöîïûùü' -]{8,20}$/);
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
            errorMessage: false,
            validMessage: false,
            showScopInput: false,
            showPassword: false, 

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
                required: helpers.withMessage('Veuillez entrer un mot de passe valide', required),
                regexPassword: helpers.withMessage('Votre mot de passe doit contenir au moins 8 caractères ', regexPassword),
                containsUppercase: helpers.withMessage('Votre mot de passe doit contenir au moins une majuscule', containsUppercase),
                containsLowercase: helpers.withMessage('Votre mot de passe doit contenir au moins une minuscule', containsLowercase),
                containsNumber: helpers.withMessage('Votre mot de passe doit contenir au moins un chiffre', containsNumber),

            },

            acceptTerms: {
                required,
                checked: value => value === true

            }
        }
    },

    methods: {
        submitForm() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.createAccount();
            }
        },
        createAccount() {
            this.$store.dispatch('createAccount', {
                pseudo: this.pseudo,
                email: this.email,
                password: this.password,
            }).then((response) => {
                this.validMessage = true;
                //this.$router.push("/login");

            })
                .catch((error) => {
                    this.errorMessage = true;
                })
            this.delayCloseAlert()
        },
        delayCloseAlert() {
            var self = this;

            setTimeout(function () {
                self.errorMessage = false;
            }, 7000);

            setTimeout(function () {
                self.validMessage = false;
            }, 10000);
        },
        pushToLoginPage() {
            this.$router.push('/login');
        },
        scopInputValue() {
            if (this.v$.password.containsLowercase.$invalid);
            if (this.v$.password.containsUppercase.$invalid);
            if (this.v$.password.containsNumber.$invalid);
        }, 
        toggleShow() {
            this.showPassword = !this.showPassword; 
        }
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

        &-container {
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            &-icon {
                font-size: 20px;
                padding-right: 10px;
                color: $color-tertiary;
            }

            &-error {
                color: $color-tertiary;
                font-weight: bold;
                margin: 0;

                @include break-mobile {
                    text-align: center;

                }
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
        }

        &-hide {
            color: $color-primary; 
            position: absolute;
            right: 24px; 
            top: 45px; 
            height: 20px;

            &:hover {
                cursor: pointer;
            }
        }

        &-show {
            color: $color-primary; 
            position: absolute;
            right: 25px; 
            top: 45px; 
            height: 20px;

            &:hover {
                cursor: pointer;
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

    &__error,
    &__valid {
        display: flex;
        margin: 0px 30px 0px 30px;
        position: fixed;
        bottom: 15px;
        left: 5px;

        @include break-tablet {
            bottom: 15px;
        }

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
            gap: 20px;

            &-icon {

                font-size: 30px;

            }

            &-text {
                font-size: 16px;
                font-weight: bold;

            }

            &-close {
                font-size: 19px;
                border-radius: 100%;

                &:hover {

                    color: #DADADA;
                }

            }
        }
    }
}

.valid {
    background-color: #3CA95B;
}

.validContains {
    color: #3CA95B
}
</style>