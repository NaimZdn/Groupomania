<script>
export default {
    name: "ProfilTabs"
}
</script>

<template>
    <div class="ProfilTabs">
        <div id="activityTabs" class="ProfilTabs__activity ActiveTabs"> Activité </div>
        <div id="settingsTabs" class="ProfilTabs__settings"> Paramètres </div>
    </div>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 

.ProfilTabs {
    display: flex;
    flex-direction: row;
    margin-left: 30px; 

    @include break-mobile {
        margin-left: 15px;
    }

    &__activity {
        padding: 10px 15px 15px;
        
    }

    &__settings {
        font-size: 16px; 
        padding: 10px 15px 15px;
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
</style>