import {createRouter, createWebHistory} from "vue-router";

import App from '../App.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import MainPage from '../views/Mainpage.vue';
import UserProfil from '../views/UserProfil.vue';

const routes = [
    { path: '/', redirect: "/login"},
    { path: "/login", component: Login },
    { path: "/signup", component: SignUp },
    { path: "/mainpage", component: MainPage },
    { path: "/profil", component: UserProfil},
    
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from) => {

    const publicPages = ["/login", "/signup"];
        if (!publicPages.includes(to.path)) {
            router.push("/login")
        };

});

export default router; 

