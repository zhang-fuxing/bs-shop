import {createWebHashHistory, createRouter} from 'vue-router';

/* users */
const Login = () => import('./../view/users/Login.vue')
const Register = () => import('./../view/users/Register.vue')

/* product */
const Home = () => import('./../view/product/Home.vue')
const ProductType = () => import('@/view/product/ProductType.vue')
const Index = () => import("@/view/product/Index.vue")
const AllType = () => import("@/view/product/AllType.vue")
const routes = [
    {
        path: '/', component: Home,
        redirect: 'index',
        children: [
            {path: 'index', component: Index},
            {path: 'all_type', component: AllType},
            {path: ':item',component: ProductType}

        ]
    },


    {path: '/login', component: Login},
    {path: '/reg', component: Register}

]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router