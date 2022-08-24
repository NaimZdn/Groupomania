<template>
    <main class="container">
        <section class="SignUpMain">

            <div class="SignUpMain__illustration">
                <img class="SignUpMain__illustration-picture" src="../assets/images/Illustration-sign-up.png" alt="Illustration Sign-Up">
            </div>

            <div class="SignUpMain__form">
                <h1 class="SignUpMain__form-header"> Créez votre compte</h1>

                <div class="SignUpMain__input">
                    <input @click='this.pseudoError = false' class="SignUpMain__input-type" type="pseudo" placeholder="Pseudo" aria-label="Entrez votre pseudo"  maxlength="20" v-model="pseudo" v-on:keydown="regex = false">
                    <fa class="SignUpMain__input-pseudo" icon="fa-solid fa-user" />

                    <div class="SignUpMain__input-container" v-if="v$.pseudo.$error">
                        <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="SignUpMain__input-error"> Veuillez entrer un pseudo valide </span>
                    </div>

                     <div class="LoginMain__input-container" v-if="pseudoError === true">
                        <fa class="LoginMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="LoginMain__input-container-error"> Le pseudo est déjà utilisé</span>
                    </div>
                </div>

                <div class="SignUpMain__input">
                    <input @click='this.emailError = false' class="SignUpMain__input-type" type="mail" placeholder="Email" aria-label="Entrez votre adresse mail" maxlength="70" v-model="email">
                    <fa class="SignUpMain__input-mail" icon="fa-solid fa-at" />

                    <div class="SignUpMain__input-container" v-if="v$.email.$error">
                        <fa class="SignUpMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="SignUpMain__input-error"> Veuillez entrer une adresse mail valide </span>
                    </div>

                    <div class="LoginMain__input-container" v-if="emailError === true">
                        <fa class="LoginMain__input-container-icon" icon="fa-solid fa-circle-xmark" />
                        <span class="LoginMain__input-container-error"> L'adresse e-mail est déjà utilisée </span>
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

            <section class="SignUpMain__popup">
                <transition name=OptionFade appear>
                    <div class="SignUpMain__popup-content" v-if="popupError">
                        <div class="SignUpMain__popup-button">

                            <div class="SignUpMain__popup-profil">
                                <fa class="SignUpMain__popup-profil-icon" icon="fa-solid fa-circle-xmark" />
                                <span class="SignUpMain__popup-profil-text"> L'inscription a échouée. <br> L'adresse Mail et/ou le pseudo est déjà utilisé </span>
                                <fa class="SignUpMain__popup-profil-close" icon="fa-solid fa-xmark" @click="popupError = false" />
                            </div>

                        </div>
                    </div>
                </transition>
            </section>

            <section class="SignUpMain__popup">
                <transition name=OptionFade appear>
                    <div class="SignUpMain__popup-content valid" v-if="popupValid" @click="pushToLoginPage()">
                        <div class="SignUpMain__popup-button">

                            <div class="SignUpMain__popup-profil">
                                <fa class="SignUpMain__popup-profil-icon" icon="fa-solid fa-circle-check" />
                                <span class="SignUpMain__popup-profil-text"> Votre compte a bien été crée <br> Cliquez-ici pour vous connecter </span>
                                <fa class="SignUpMain__popup-profil-close" icon="fa-solid fa-xmark" @click="popupValid = false" />
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
import { containsUppercase, containsLowercase, containsNumber } from "../common/regexSignUp.js"

const regexPseudo = helpers.regex(/^[A-z0-9éèôöîïûùü' -]{4,20}$/);
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
            popupError: false,
            popupValid: false,
            showScopInput: false,
            showPassword: false, 
            pseudoError: false, 
            emailError: false, 
            pseudoErrorMessage: ``,  
            pseudoErrorText: '', 
            emailErrorText:'', 

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

            },
        };
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
                this.popupValid = true;

            }).catch((error) => {

                this.pseudoErrorText = error.response.data.error.errors.pseudo 
                this.emailErrorText = error.response.data.error.errors.email 

                this.showErrorMessage(); 
                this.popupError = true;

            })

            this.delayCloseAlert()
        },
        delayCloseAlert() {
            var self = this;
            setTimeout(function () {self.popupError = false}, 7000);
            setTimeout(function () {self.popupValid = false}, 10000);

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
        }, 
        showErrorMessage() {
            if (this.emailErrorText != undefined){
                this.emailError = true; 

            } 
            if (this.pseudoErrorText != undefined) {
                this.pseudoError = true;

            }; 
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

        &-container {
            @include InputController;
        }

        &-mail {
            @include MailInput;
        }

        &-password {
            @include PasswordInput;
        }

        &-error {
            color: $color-tertiary;
            font-weight: bold;
        }

        @include ShowPassword
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

    &__popup {
        @include PopupMessage
        
    }
}

.valid {
    background-color: #3CA95B;
}

.validContains {
    color: #3CA95B
}
</style>