import axios from "axios";
import stoer from "@/store"
import {error} from "@babel/eslint-parser/lib/convert";

var baseURL = 'http://localhost:9000/'

// eslint-disable-next-line no-unused-vars
export function sendGet(url, param) {
    return axios.get(url, param).then((resp) => {
        return resp.data
    }).catch(error => {
        return error
    })

}