import { createStore } from "vuex";

export default createStore({
    state: {
        backendUrlNoV1: "https://theatreofplaywrightsapi.space:8443",

        backendUrl: "https://theatreofplaywrightsapi.space:8443/api/v1",
        // backendUrl: "http://mysite.com:8000/api/v1",
        currentLanguage: 0,
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        getServerUrl: (state) => {
            return state.backendUrl;
        },
        getServerUrlNoV1: (state) => {
            return state.backendUrlNoV1;
        },

        getCurrentLanguage: (state) => {
            return state.currentLanguage;
        },
    },
});