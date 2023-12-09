import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import htmlToPaper from 'vue-html-to-paper';
import html_to_paper_options from './helper/html-to-paper-options';
import VueAxios from 'vue-axios';

const Vue = createApp(App);
Vue.use(htmlToPaper, html_to_paper_options)
Vue.use(VueAxios, axios).mount('#app')





