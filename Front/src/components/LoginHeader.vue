<script>
export default {
    name: "LoginHeader"
}
</script>

<template>
    <header class="container">
      <nav class="LoginHeader">

        <div class="LoginHeader__logo">
          <img class="LoginHeader__logo-desktop" src="../assets/images/Logo_red.png" alt="Groupomania logo">
        </div>

        <div class="LoginHeader__routes">
          <router-link class="LoginHeader__routes-login" to="/login"> Se connecter </router-link>
          <router-link class="LoginHeader__routes-signup" to="/sign-up"> S'inscrire </router-link>
        </div>

      </nav>
    </header>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

@include Container; 

.LoginHeader {
    display: flex;
    margin: 30px 30px 0 30px;
    align-items: center;
    flex-direction: row-reverse;

    @include break-mobile {
        display: block;
        margin: 30px 15px 0 15px;
    }

    &__logo{
        @include break-mobile {
            display: flex;
            justify-content: center;

    }

        &-desktop {
            height: 40px;

            @include break-mobile {
                height: 40px;

            }
        }
    }

    &__routes {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;

        @include break-mobile {
            justify-content: center;
            margin-top: 50px;
            gap: 15px;
        }

        &-login {
            
            @include HeaderRoutes-active; 
        }

        &-signup {
         
            margin-left: 50px;
            @include HeaderRoutes-inactive;
        }
    }
}
</style>