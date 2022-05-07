import axios from "axios";
import store from "@/store/index.js"
let baseURL = 'http://localhost:9000'
let token = store.state.token
// localStorage.getItem("token")
axios.defaults.baseURL = baseURL
const send = {
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            axios.post(url, data,{headers:{token}}).then(resp => {
                resolve(resp.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    get: (url, param) => {
        return new Promise((resolve, reject) => {
            axios.get(url,param,{headers:{token}}).then(resp => {
                resolve(resp.data)
            }).catch(error => {
                reject(error)
            })
        })

    },
    fileupload: (url, data) => {
        let formData = new FormData()
        for (let i = 0; i < data.length; i++) {
            formData.append("file", data[i])
        }
        return new Promise((resolve, reject) => {
            axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data',token}})
                .then(resp => {
                    resolve(resp.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

}

export default send