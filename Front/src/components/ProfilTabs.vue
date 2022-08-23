<template>

    <div class="ProfilTabs">
        <div class="ProfilTabs__settings ActiveTabs"> Paramètres </div>
    </div>

    <div class="Profil__tabs">

        <article class="ProfilTabsSettings">
            <div class="ProfilTabsSettings__user">
                <p class="ProfilTabsSettings__user-date"> Utilisateur enregistré depuis le {{dateTime(userInfos.createdAt)}} </p>
                <div class="ProfilTabsSettings__delete">
                    <button class="ProfilTabsSettings__delete-button" aria-label="Cliquez-ici pour supprimer votre compte" @click="deleteAccountConfirmation = true"> Supprimer le compte </button>
                </div>
            </div>  

            <transition name="fade" appear>
                <div class="ProfilTabsSettings__bg" v-if="deleteAccountConfirmation" @click="deleteAccountConfirmation = false"></div>
            </transition>

            <transition name=slide appear>
                <div class="ProfilTabsSettings__content" v-if="deleteAccountConfirmation"> 
                <p class="ProfilTabsSettings__content-text"> Êtes-vous sur de vouloir supprimer votre compte ? </p>
                    <div class="ProfilTabsSettings__confirmation"> 
                        <button class="ProfilTabsSettings__confirmation-true" aria-label="Oui vous êtes sur de supprimer votre compte" @click='deleteAccount'> Oui </button>
                        <button class="ProfilTabsSettings__confirmation-false" aria-label="Non je ne souhaite pas supprimer mon compte" @click="deleteAccountConfirmation = false"> Non </button>
                    </div>   
                </div>
            </transition> 
        </article>

    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales';
export default {
    name: "ProfilTabs",

    data() {
        return {
            deleteAccountConfirmation: false,
            userInfos: [], 
        }
    },

    mounted(){  
        this.userInfos= JSON.parse(localStorage.getItem('user')); 
    }, 


    methods: {
        deleteAccount() {
            this.$store.dispatch('deleteAccount')
            .then((response) => {
               this.$router.push("/");

            })
            .catch((error) => {
                console.log('error');
            })    

        }, 
        dateTime(value) {
            moment.locale('fr');
            return moment(value).format('ll');
        },
    },
}

</script>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.ProfilTabs {
    display: flex;
    flex-direction: row;
    margin-left: 30px; 

    @include break-mobile {
        margin-left: 15px;
    }

    &__settings {
        font-size: 16px; 
        padding: 10px 15px 5px 15px;
        font-weight: bold;
        color: $color-primary;
        cursor: pointer;

    }

    & .ActiveTabs {
        font-size: 16px; 
        background-color: $color-primary;
        color:white; 
        border-radius: 6px 6px 0 0;
        cursor: pointer;
        font-weight: bold;
    }
}

.Profil__tabs {
    margin: 0 30px 20px 30px;

    @include break-mobile {
        margin: 0 15px 20px 15px; 
    } 
}

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