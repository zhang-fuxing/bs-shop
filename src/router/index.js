import { createWebHashHistory,createRouter } from 'vue-router';

/* users */
const Login = ()=>import('./../view/users/Login.vue')
const Register = ()=>import('./../view/users/Register.vue')

/* product */
const Home = ()=>import('./../view/product/Home.vue')


const routes = [
    { path: '/', redirect: '/home'},
    { path: '/home', component:Home},
    {path: '/login',component: Login},
    { path: '/reg', component: Register}

]



const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router