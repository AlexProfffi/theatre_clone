import { createRouter, createWebHashHistory } from "vue-router";
import PlaysView from "../views/PlaysView.vue";

const routes = [{
        path: "/",
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
        path: "/play" + ":id",
        name: "play",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/PlayDetailView.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;