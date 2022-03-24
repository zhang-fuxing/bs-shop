import { createStore } from 'vuex'
import {reactive} from "vue";

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {
            token:'',
            currentUrl: ''
        }
    },
    mutations: {
        addToken(state,param) {
            state.token=param.token
            localStorage.setItem('token', param.token)
        },
        removeToken(state) {
            state.token=''
        },

    },
    actions: {
        setToken({commit},param) {
            commit('addToken', param)
        },
        removeToken() {
            store.commit('remove')
        },

    },
    getters: {
        getToken : (state) => state.token,

    }
})
export default store