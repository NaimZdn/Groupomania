<script>
export default {
    name: "SignUpMain"
}
</script>

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
                    <input id="pseudoInput" class="SignUpMain__input-type" type="pseudo" placeholder="Pseudo">
                    <fa class="SignUpMain__input-pseudo" icon="fa-solid fa-user" />
                </div>

                <div class="SignUpMain__input">
                    <input id="mailInput" class="SignUpMain__input-type" type="mail" placeholder="Email">
                    <fa class="SignUpMain__input-mail" icon="fa-solid fa-at" />
                </div>

                <div class="SignUpMain__input">
                    <input id="passwordInput" class="SignUpMain__input-type" type='password' placeholder="Mot de passe">
                    <fa class="SignUpMain__input-password" icon="fa-solid fa-lock" />
                </div>

                <div class="SignUpMain__checkbox">
                    <input class="SignUpMain__checkbox-type" type="checkbox">
                    <span class="SignUpMain__checkbox-text"> J'accepte les <a class="SignUpMain__checkbox-cgu" href="#">conditions générales d'utilisations</a></span>
                </div>

                <div class="SignUpMain__button">
                    <button class="SignUpMain__button-signup"> Créer mon compte </button>
                </div>

            </div>
        </section>
    </main>
</template>

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

        &-type {
            @include LogInput;

        }

        &-pseudo {
            position: absolute;
            left: 27px;
            top: 161px;
            height: 30px;
            color: $color-primary;

            @include break-mobile {
                position: absolute;
                left: 27px;
                top: 121px;
                height: 30px;

            }

            &:hover {
                animation: bubble 0.5s;

            }
        }

        &-mail {
            position: absolute;
            left: 26px;
            top: 269px;
            height: 33px;
            color: $color-primary;

            @include break-mobile {
                position: absolute;
                left: 27px;
                top: 229px;
                height: 30px;

            }

            &:hover {
                animation: bubble 0.5s;

            }
        }

        &-password {
            position: absolute;
            left: 27px;
            top: 374px;
            height: 30px;
            color: $color-primary;

            @include break-mobile {
                position: absolute;
                left: 27px;
                top: 333px;
                height: 30px;
            }

            &:hover {
                animation: bubble 0.5s;

            }
        }
    }

    &__checkbox {
        display: flex;
        align-items: center;

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

        &-signup {
            @include LogButton;
            margin-bottom: 50px;
            

        }
    }
}
</style>