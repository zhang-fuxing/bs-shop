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
    // home
    {
        path: '/', component: Home,
        redirect: 'index',
        children: [
            {path: 'index', component: Index},
            {path: 'all', component: AllType},
            {path: ':item',component: ProductType}

        ]
    },

    // cart
    {path:'/cart', component: ()=>import('@/view/cart/Index.vue')},

    // user
    {path: '/login', component: Login},
    {path: '/reg', component: Register},
    {path: '/center', component: ()=>import('@/view/users/UserCenter.vue')}

]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router