<script>
export default {
    name: "LoginMain"
}

</script>

<template>
    <main class="container">
        <section class="LoginMain">

            <div class="LoginMain__illustration ">
                <img class="LoginMain__illustration-picture" src="../assets/images/Illustration-login.png" alt="Illustration Login">
            </div>

            <div class="LoginMain__form">
                <h1 class="LoginMain__form-header" > S'identifier </h1>

                <div class="LoginMain__input">
                    <input id="mailInput" class="LoginMain__input-type" type="mail" placeholder="Email">
                    <fa class="LoginMain__input-mail" icon="fa-solid fa-at" />
                </div>

                <div class="LoginMain__input">
                    <input id="passwordInput" class="LoginMain__input-type" type='password' placeholder="Mot de passe">
                    <fa class="LoginMain__input-password" icon="fa-solid fa-lock" />
                </div>

                <div class="LoginMain__button">
                    <button id="logButton" class="LoginMain__button-login"> Se connecter </button>
                </div>

            </div>
        </section>
    </main>
</template>

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

        &-type {
            @include LogInput; 

        }

        &-mail {
            position: absolute;
            left: 20px;
            top: 162px;
            font-size: 35px;
            color: $color-primary;

            @include break-mobile {
                position: absolute;
                left: 20px;
                top: 120px;
                height: 35px;

            }   

            &:hover {
                animation: bubble 0.5s

            }
        }

        &-password {
            position: absolute;
            left: 27px;
            top: 268px;
            height: 30px;
            color: $color-primary;

            @include break-mobile {
                position: absolute;
                left: 27px;
                top: 227px;
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
        margin-top: 12px;
        margin-bottom: 30px;

        &-login {
          @include LogButton; 

        }
    }
} 
</style>