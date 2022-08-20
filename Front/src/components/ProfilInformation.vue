<template>
    <div class="ProfilInformation">
        <div class="ProfilInformation__picture">
            <img id="userPicture" class="ProfilInformation__picture-user" :src="userInfos.picture" alt="Votre photo de profil">
            
   
        </div>
        <div class="ProfilInformation__pseudo">
            <p  class="ProfilInformation__pseudo-text"> {{userInfos.pseudo}} </p>
            
          
            <p  class="ProfilInformation__pseudo-bio"> {{userInfos.bio}} </p>
            
        </div>
    </div>

</template>
<script>
import { mapState } from 'vuex'; 

export default {
    name: "ProfilInformation",
     data() {
        return {
            userData: JSON.parse(localStorage.getItem('user'))
           
        }
    },

     mounted() {
        if (localStorage.user) {
            this.userData = JSON.parse(localStorage.user)
            //console.log(this.userInfos)
        }
    },

    computed: {
        ...mapState({
           userInfos: 'userInfos',
            
        })
    }

}
</script>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.ProfilInformation {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;

    @include break-mobile{
        flex-direction: column;

    }

    &__picture {
        margin: 30px 0 30px 30px;
        height: 200px;
        width: 200px;
        min-height: 200px;
        min-width: 200px;
        border-radius: 100%;
        border: 4px solid $color-primary;
        
        

        @include break-mobile {
            margin-left: 0; 
            }

        &-user {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
            transition: .3s ease-in-out;

        }
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__pseudo {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 30px; 
        font-size: 40px;
        margin-left: 40px;   

        @include break-mobile {
            gap: 15px;
            margin: 0 15px 0 15px; 
            font-size: 25px;
            margin: 0;
                        
        }
        
        &-text{
        
            @include break-mobile {
                text-align: center;
                margin-top: 0;
                        
            } 
        }

        &-admin {
            font-size: 20px; 
            font-weight: bold; 
            padding: 7px 15px 7px 15px;
            background-color: $color-primary;
            border-radius: 10px;
            color: white; 
            
            @include break-mobile {
                margin-top: -10px;
                font-size: 15px;
                
            }
        }

        &-bio {
            border-left: 3px solid $color-primary;
            font-size: 16px;
            font-style: italic;
            padding-left: 10px; 
            margin-right: 30px;
            margin-left: 40px;

            @include break-mobile {                
                margin: 0 15px 0 15px; 
                text-align: center;
            }
        }
    }

    &__button {
        display: flex;
        justify-content: flex-end;
        margin: 10px 30px 30px 0; 

        @include break-mobile {
            justify-content: center;
            margin: 10px 0 30px 0;
    
        }

        &-modification {
            @include send-button;

            @include break-mobile {
                width: 100%;
                margin: 0 15px 0 15px;
            }
        }
    }
}
</style>