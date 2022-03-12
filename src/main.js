import {createApp} from 'vue'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import router from './router/index.js'
import App from './App.vue'


const app = createApp(App)
app.use($)
app.use(router)
app.mount('#app')
