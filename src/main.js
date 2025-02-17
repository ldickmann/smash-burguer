// filepath: /c:/Users/ldick/repositorios_github/smash-burguer/src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from './plugins/fontawesome';
import piniaPersist from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import '@/assets/main.scss';

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon);

// Plugin de persistência de login
pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.mount('#app');
