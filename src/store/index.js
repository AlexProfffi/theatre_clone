import { createStore } from "vuex";

export default createStore({
    state: {
        backendUrl: "http://45.94.158.125:8080/api/v1",
        // backendUrl: "http://mysite.com:8000/api/v1",

    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        getServerUrl: (state) => {
            return state.backendUrl;
        },
    },
});