import {createApp} from 'vue'
import $ from 'jquery'
import 'bootstrap3/dist/js/bootstrap.min'
import 'bootstrap3/dist/css/bootstrap.min.css'
import router from './router/index.js'
import store from "@/store";
import element from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use($)
app.use(router)
app.use(store)
app.use(element)

app.mount('#app')
