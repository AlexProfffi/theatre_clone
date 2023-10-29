import {
    createRouter,
    // createWebHashHistory, 
    createWebHistory
} from "vue-router";
// import VueRouter from 'vue-router';
import PlaysView from "../views/PlaysView.vue";

const routes = [{
        path: "/plays",
        name: "plays",
        component: PlaysView,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
        path: "/contacts",
        name: "contacts",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/ContactsView.vue"),
    },
    {
        path: "/play-" + ":name" + "-idn-" + ":id" + "-idp-" + ":date_id",
        name: "play",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/PlayDetailView.vue"),
        props: true,
    },
    {
        path: "/offer",
        name: "Offer",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/OfferView.vue"),
    },
    {
        path: "/success",
        name: "Success",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/SuccessPayView.vue"),
    },
    {
        path: "/registration",
        name: "Registration",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/RegistrationView.vue"),
    },
    {
        path: "/auth",
        name: "Auth",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/AuthView.vue"),
    },
    {
        path: "/my_profile",
        name: "Profile",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/ProfileView.vue"),
    },
    {
        path: "/our_partners",
        name: "Partners",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/PartnersView.vue"),
    },
    {
        path: "/news",
        name: "News",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/NewsView.vue"),
    },
    {
        path: "/search",
        name: "Search",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/SiteSearchView.vue"),
    },
    {
        path: "/",
        name: "MainPageView",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/MainPageView.vue"),
    },
    {
        path: "/playwriter-" + ":name" + "-idp-" + ":id",
        name: "playwriter",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/PlayWriterView.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;