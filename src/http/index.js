import axios from "axios";

let baseURL = 'http://localhost:9000'
let token=localStorage.getItem("token")

const send = {
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            axios({
                baseURL,
                type: 'post',
                url: url,
                data: data,
                headers: {token},
            }).then(resp => {
                resolve(resp.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    get: (url, param) => {
        return new Promise((resolve,reject)=>{
            axios({
                baseURL,
                type:'get',
                url:url,
                param:param,
                headers: [{token}]
            })
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