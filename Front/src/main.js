import { createApp } from 'vue';
import {createRouter, createWebHistory} from "vue-router";



import App from './App.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import MainPage from './components/Mainpage.vue';
import UserProfil from './components/UserProfil.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

/*import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'*/

import './sass/main.scss';

const routes = [
    { path: '/', component: App},
    { path: "/login", component: Login },
    { path: "/sign-up", component: SignUp },
    { path: "/mainpage", component: MainPage },
    { path: "/profil", component: UserProfil},
    
];

const router = createRouter({ history: createWebHistory(), routes});


const app = createApp(App);
app.use(router);
app.component('fa', FontAwesomeIcon);
// app.use(BootstrapVue3)




app.mount('#app');
