import { createApp } from 'vue';
import App from './App.vue';

// Aura theme
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Layout & icons
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

// Configure PrimeVue with the Aura theme and options
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark' // Dark mode will be applied when the .my-app-dark class is present on an element
        }
    }
});

// Mount the Vue application to the DOM
app.mount('#app');