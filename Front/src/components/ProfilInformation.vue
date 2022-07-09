<script>
export default {
    name: 'ProfilInformation'
}
</script>

<template>
    <div class="ProfilInformation">
        <div class="ProfilInformation__picture">
            <img id="userPicture" class="ProfilInformation__picture-user" src="../assets/images/Photo CV.jpg">
        </div>
        <div class="ProfilInformation__pseudo">
            <p id="userPseudo" class="ProfilInformation__pseudo-text"> Pseudo</p>
        </div>
    </div>

    <div class="ProfilInformation__button">
        <button id="modificationButton" class="ProfilInformation__button-modification"> Modifier vos informations </button>
    </div>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.ProfilInformation {
    display: flex;
    flex-direction: row;
    align-items: center;

    @include break-mobile{
        flex-direction: column;

    }

    &__picture {
        margin: 30px 0 30px 30px;
        height: 200px;
        width: 200px;
        min-height: 200px;
        min-width: 200px;

        @include break-mobile {
            margin-left: 0; 
            }

        &-user {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
            border: 4px solid $color-primary;
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
                margin-top: 0;
                        
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