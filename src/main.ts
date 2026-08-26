import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {vMaska} from "maska/vue";
import { createVuetify } from 'vuetify';
// import 'vuetify/styles';


import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
});

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.directive('maska', vMaska)
app.use(vuetify)

app.mount('#app')
