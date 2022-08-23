

<template>
    <article class="ProfilTabsSettings">
        <div class="ProfilTabsSettings__user">
            <p id="inscriptionDate" class="ProfilTabsSettings__user-date"> Utilisateur enregistré depuis le {{dateTime(userInfos.createdAt)}} </p>
            <div class="ProfilTabsSettings__delete">
                <button id="deleteUser" class="ProfilTabsSettings__delete-button" @click="confirmation = true"> Supprimer le compte </button>
            </div>
        </div>  

        <transition name="fade" appear>
            <div class="ProfilTabsSettings__bg" v-if="confirmation" @click="confirmation = false">
            </div>
        </transition>


        <transition name=slide appear>
            <div class="ProfilTabsSettings__content" v-if="confirmation"> 
            <p class="ProfilTabsSettings__content-text"> Êtes-vous sur de vouloir supprimer votre compte ? </p>
                <div class="ProfilTabsSettings__confirmation"> 
                    <button class="ProfilTabsSettings__confirmation-true" @click='deleteAccount'> Oui </button>
                    <button class="ProfilTabsSettings__confirmation-false" @click="confirmation = false"> Non </button>
                </div>
            
            </div>
        </transition>

        
    </article>

</template>

<script>
import moment from 'moment/min/moment-with-locales';

export default {
    name: "ProfilTabsSettings",
    data() {
        return {
            confirmation: false,
            userInfos: [], 
        }
    },

    mounted(){  
        let userInfos = JSON.parse(localStorage.getItem('user')); 
        userInfos = this.UserInfos
    }, 


    methods: {
        deleteAccount() {
            this.$store.dispatch('deleteAccount')
            .then((response) => {
               this.$router.push("/")

            })
            .catch((error) => {
                console.log('error')
            })    

        }, 
        dateTime(value) {
            moment.locale('fr')
            return moment(value).format('ll')
    }

    }
}
</script>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.ProfilTabsSettings {
    display: flex;
    justify-content: center; 
    background-color: $color-primary;
    border-radius: 0 6px 6px 6px; 

    &__user{
        margin: 20px;
        background-color: white;
        width: 100%;
        border-radius: 6px;

        &-date {
            margin-left: 15px;
        }
    }

    &__delete{
        display: flex;
        justify-content: center;
        
        &-button {
            margin: 0 15px 15px 15px;
            width: 100%;
            @include send-button;

        }
    }

    &__bg {
        position: fixed;
        inset: 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;

    }

    &__content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;

        flex-direction: column;
        display: flex;
        min-width: 500px;

        background-color: white;
        padding: 30px;
        border-radius: 6px;
        box-shadow: $primary-shadow;


        @include break-mobile {
            min-width: 25%;
            margin-top: 50px;


        }

        &-text {
            text-align: center;
            margin-top: 0;
            font-size: 18px;
            
            
        }
    }

    &__confirmation {
        display: flex; 
        justify-content: center;
        flex-direction: row;
        gap: 30px; 
       
        &-true {
            @include send-button;
            width: 50%;
            row-gap: 30px; 
            
            background-color: $color-secondary;
            color: $color-primary;

            &:hover {
                background-color: #FED8D0;

            }

        }
        
        &-false {
             @include send-button;
              width: 50%;

        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;

}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform .5s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-50%) translateX(100vw);
}
</style>