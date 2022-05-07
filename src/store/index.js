import {
    createStore
} from 'vuex'
import {
    reactive
} from "vue";

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            token: null,
            currentNav: 0,
            uid: null,
            previewList:[],
            detailList:[],
            total: 0,
            productSet: []

        }
    },
    mutations: {
        addToken(state, param) {
            state.token = param.token
            localStorage.setItem('token', param.token)
        },
        removeToken(state) {
            state.token = ''
        },

        updateNav(state, param) {
            state.token = param.index
        },

        addUid(state, param) {
            state.uid = param.uid
        },
        addPreviewList(state,data) {
            state.previewList.push(data)
        },

        clearPreviewList(state) {
            state.previewList.length = 0
        },
        addDetailList(state,data) {
            state.detailList.push(data)
        },

        clearDetailList(state) {
            state.detailList.length = 0
        },
        addCount(state ,param) {
            state.total = param
        },
        clearCount(state) {
            state.total = 0
        }
    },
    actions: {
        setToken({commit}, param) {
            commit('addToken', param)
        },
        removeToken() {
            store.commit('remove')
        },

        setCurrentNav({commit}, param) {
            commit('updateNav', param)
        },
        setUid({commit}, param) {
            commit('addUid', param)
        },

        setPreviewList({commit},data) {
            commit('addPreviewList',data)
        },
        resetPreviewList({commit}){
            commit('clearPreviewList')
        },
        setDetailList({commit},data) {
            commit('addDetailList',data)
        },
        resetDetailList({commit}){
            commit('clearDetailList')
        },
        setTotal({commit},param) {
            commit('addCount',param)
        },
        resetTotal({commit}) {
            commit('clearCount')
        }

    },
    getters: {
        getToken: (state) => state.token,
        getNav: (state) => state.currentNav,
        getUid: state => state.uid

    }
})
export default store