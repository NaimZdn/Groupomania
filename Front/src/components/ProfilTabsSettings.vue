<script>
export default {
    name: "ProfilTabsSettings"
}
</script>

<template>
    <article class="ProfilTabsSettings">
        <div class="ProfilTabsSettings__user">
            <p id="inscriptionDate" class="ProfilTabsSettings__user-date"> Utilisateur inscrit le 10 juin 2010 </p>
            <div class="ProfilTabsSettings__delete">
                <button id="deleteUser" class="ProfilTabsSettings__delete-button" > Supprimer le compte </button>
            </div>
        </div>  

        
    </article>

</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.ProfilTabsSettings {
    display: flex;
    justify-content: center; 
    background-color: $color-primary;
    border-radius: 6px; 

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
}


</style>