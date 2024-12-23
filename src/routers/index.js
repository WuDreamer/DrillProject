import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect: "/home", // 进行重定向到home
    children: [{
        path: '/home',
        name: 'Home',
        meta: {
            title: "首页"
        },
        component: () => import('../views/Home.vue'),
    }, {
        path: 'user',
        name: 'User',
        meta: {
            title: "用户管理"
        },
        component: () => import('../views/User.vue'),
    }, {
        path: 'admin',
        name: 'Admin',
        meta: {
            title: "用户管理"
        },
        component: () => import('../views/Admin.vue'),
    }, {
        path: 'article',
        name: 'Article',
        meta: {
            title: "文章管理"
        },
        component: () => import('../views/Article.vue'),
    }, ]

}, {
    path: '/login',
    name: 'Login',
    meta: {
        title: "登录"
    },
    component: () => import('../views/Login.vue'),
}, {
    path: '/register',
    name: 'Register',
    meta: {
        title: "注册"
    },
    component: () => import('../views/Register.vue'),
}]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    next()
})

export default router