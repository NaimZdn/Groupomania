<script>
export default {
    name: "SignUpHeader"
}
</script>

<template>
    <header class="container">
      <nav class="SignUpHeader">

        <div class="SignUpHeader__logo">
          <img class="SignUpHeader__logo-desktop" src="../assets/images/Logo_red.png" alt="Groupomania logo">
        </div>

        <div class="SignUpHeader__routes">
          <router-link class="SignUpHeader__routes-login" to="/login"> Se connecter </router-link>
          <router-link class="SignUpHeader__routes-signup" to="/sign-up"> S'inscrire </router-link>
        </div>

      </nav>
    </header>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

@include Container;

.SignUpHeader {
    display: flex;
    margin: 30px 30px 0 30px;
    align-items: center;

    @include break-mobile {
        display: block;
        margin: 30px 15px 0 15px;
    }

    &__logo {
        @include break-mobile {
            display: flex;
            justify-content: center;
        }

        &-desktop{
            height: 40px;

            @include break-mobile {
                height: 40px;

            }
        }
    }

    &__routes {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;

        @include break-mobile {
            justify-content: center;
            margin-top: 50px;
            gap: 10px;
        }

        &-login {
            margin-right: 50px;
            @include HeaderRoutes-inactive
        }

        &-signup {
            @include HeaderRoutes-active

        }
    }
}
</style>