import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {
            context: {
                token:''
            }
        }
    },
    mutations: {
        add(state,param) {
            state.context.token=param.token
            localStorage.setItem('token', param.token)
            alert(localStorage.getItem('token')+'===')
        },
        remove(state) {
            state.context.token=''
        }
    },
    actions: {
        setToken({commit},param) {
            commit('add', param)
        },
        removeToken() {
            store.commit('remove')
        }
    },
    getters: {
        getToken : (state) =>  ()=> {
            return state.context.token
        }
    }
})
export default store