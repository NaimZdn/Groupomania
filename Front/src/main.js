import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import store from './store';
import router from './router/routes';
import App from './App.vue';



library.add(fas, fab);


const app = createApp(App);
app.use(store)
app.use(router);
app.component('fa', FontAwesomeIcon);

app.mount('#app');
