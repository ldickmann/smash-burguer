import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@/plugins/fontawesome';
import piniaPersist from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import { migrateLegacyAccount } from '@/services/authServices';

// Fontes self-hosted, importadas uma única vez (SPEC §2.3)
import '@fontsource/bebas-neue/400.css';
import '@fontsource-variable/archivo';
import '@/assets/main.scss';

// O cadastro antigo em `localStorage.user` passa para `smash-burger:account` (§10.3)
migrateLegacyAccount();

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon);

// Plugin de persistência de login
pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.mount('#app');
