import {createWebHashHistory, createRouter} from 'vue-router';

const routes = [
    // home
    {
        path: '/', component: () => import('@/view/product/Home.vue'),
        redirect: '/index',
        children: [
            {path: 'index', component: () => import("@/view/product/Index.vue")},
            {path: 'all', component: () => import("@/view/product/AllType.vue")},
            {path: ':item', component: () => import('@/view/product/ProductType.vue')},
            {path: 'product/:id', component: () => import('@/view/product/ProductDetail.vue')},


        ]
    },

    // product


    // cart
    {path: '/cart', component: () => import('@/view/cart/Index.vue')},

    // user
    {path: '/login', component: () => import('@/view/users/Login.vue')},
    {path: '/reg', component: () => import('@/view/users/Register.vue')},
    {
        path: '/center', component: () => import('@/view/users/UserCenter.vue'),
        redirect: '/center/home',
        // 用户中心具体页面
        children: [
            {path: 'home', component: () => import('@/view/users/page/UserHome.vue')},
            {path: 'address', component: ()=> import('@/view/users/page/Address.vue')},
            {path: 'waitOrder', component: ()=> import('@/view/users/page/WaitOrder.vue')},
            {path: 'ReceivedOrder', component: ()=> import('@/view/users/page/ReceivedOrder.vue')},
            {path: 'accountManage', component: ()=> import('@/view/users/page/AccountManage.vue')},
            {path: 'estimate', component: ()=> import('@/view/users/page/Estimate.vue')},
        ]
    },

    // admin
    {
        path: '/admin', component: () => import('@/view/admin/ProductManage.vue'),
        redirect: '/admin/login',
        children: [
            {path: 'index', component: () => import('@/view/admin/active/ProductHome.vue')},
            {path: 'addProduct', component: () => import('@/view/admin/active/AddProduct2.vue')},
            {path: 'orderProcessing', component: () => import('@/view/admin/active/OrderProcessing.vue')},
            {path: 'recommend', component: () => import('@/view/admin/active/Recommend.vue')},
            {path: 'userList', component: () => import('@/view/admin/active/UserList.vue')},
            {path: 'freeze', component: () => import('@/view/admin/active/Freeze.vue')},

        ]
    },
    {path: '/admin/login', component: () => import('@/view/admin/Login.vue')},
    {path: '/admin/reg', component: () => import('@/view/admin/Register.vue')},

]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router