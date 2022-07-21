<script>
export default {
    name: "SocialFooter"
}
</script>

<template>
    <footer class="SocialFooter">
        <div class="footer-icon">
            <a href="https://www.facebook.com/" target="_blank" aria-label="Notre Facebook">
                <fa class="icon" :icon="['fab', 'facebook-f']" /> 
            </a>
        </div>

        <div class="footer-icon">
            <a href="https://www.linkedin.com/" target="_blank" aria-label="Notre LinkedIn">
                <fa class="icon" :icon="['fab', 'linkedin-in']" />
            </a>
        </div>

        <div class="footer-icon">
            <a href="https://twitter.com/" target="_blank" aria-label="Notre Twitter">
                <fa class="icon" :icon="['fab', 'twitter']" />
            </a>
        </div>

        <div class="footer-icon">
            <a href="mailto:groupomania@support.com" aria-label="Nous contacter">
                <fa class=icon icon="fa-solid fa-envelope" />
            </a>
        </div>
    </footer>
</template>

<style lang="scss">
@import "../assets/sass/main.scss"; 


.SocialFooter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 70px;
    width: 100%;
    
    margin-bottom: 10px;
    
    

    @include break-mobile {
        gap: 30px;

    }

    & .footer-icon {
        & .icon {
            font-size: 25px;
            padding: 12px;
            color: $color-primary; 

            &:hover {
                background-color: $color-secondary;
                clip-path: circle(40%);
                animation: bubble 0.5s;

            }
        }
    }
}
</style>