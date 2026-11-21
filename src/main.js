import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@/plugins/fontawesome';
import piniaPersist from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import { migrateLegacyAccount } from '@/services/authServices';

// Roboto Variable self-hosted, importada uma única vez (SPEC-material §2.3)
import '@fontsource-variable/roboto';
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
