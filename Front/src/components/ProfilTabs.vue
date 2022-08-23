<template>
    <div class="ProfilTabs">
       <!-- <div id="activityTabs" class="ProfilTabs__activity" v-on:click="addClassActivity"  v-bind:class="{'ActiveTabs': ActiveTabsActivity }"> Activité</div>-->
        <div id="settingsTabs" class="ProfilTabs__settings ActiveTabs" > Paramètres </div>
    </div>

    <div class="Profil__tabs">
        <!--<ProfilTabsActivity v-if="!ActiveTabsSettings"/>-->
        <ProfilTabsSettings/>
    </div>

</template>


<script>
import ProfilTabsSettings from './ProfilTabsSettings.vue';
import ProfilTabsActivity from './ProfilTabsActivity.vue';
export default {
    name: "ProfilTabs",
    data() {
        return {
            ActiveTabsActivity: true,
            ActiveTabsSettings: false,
        };
    },
    methods: {
        addClassActivity: function () {
            this.ActiveTabsActivity = true;
            this.ActiveTabsSettings = false;
        },
        addClassSettings: function () {
            this.ActiveTabsSettings = true;
            this.ActiveTabsActivity = false;
        },
    },
    components: { ProfilTabsSettings, ProfilTabsActivity }
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

    &__activity {
        padding: 10px 15px 15px;
        font-size: 16px; 
        font-weight: bold;
        color: $color-primary;
        cursor: pointer;
        
    }

    &__settings {
        font-size: 16px; 
        padding: 10px 15px 15px;
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
</style>