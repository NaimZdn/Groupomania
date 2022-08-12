<template>
    <div class="ProfilInformation">
        <div class="ProfilInformation__picture">
            <img id="userPicture" class="ProfilInformation__picture-user" :src="userInfos.picture" alt="Votre photo de profil">
   
        </div>
        <div class="ProfilInformation__pseudo">
            <p  class="ProfilInformation__pseudo-text"> {{user.pseudo}}</p>
            <p  class="ProfilInformation__pseudo-bio">{{userInfos.bio}}</p>
            
        </div>
    </div>

</template>
<script>
import { mapState } from 'vuex'; 

export default {
    name: "ProfilInformation",
    mounted: function () {
        //console.log(`/api/auth/user/${this.$store.state.user.userId}`)
        if(this.$store.state.user.userId == '') {
            this.$router.push('/')
        }
        this.$store.dispatch('getUserInfos')
    },
    methods: {
        getUserInfos: function () {
            this.$store.dispatch('getUserInfos', {
            }).then((response) => {
                console.log(response.data);

            })
                .catch((error) => {
                    alert("L'Email et/ou le Mot de passe est incorrect");
                    this.popup = true;
                    console.log(error);
                })
        }
    },
    computed: {
        ...mapState({
            user: 'user', 
            userInfos: 'userInfos'
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

    &__pseudo {
        font-size: 40px;
        margin-left: 40px;   

        @include break-mobile {
            font-size: 30px;
            margin: 0;
                        
        }
        
        &-text{
        
            @include break-mobile {
                text-align: center;
                margin-top: 0;
                        
            } 
        }

        &-bio {
            border-left: 3px solid $color-primary;
            font-size: 16px;
            font-style: italic;
            padding-left: 10px; 
            margin-right: 30px;

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