import axios from "axios";
import stoer from "@/store"

var baseURL='http://localhost:9000/'
const instance = axios.create({
    baseURL,
    headers:{
        'token':stoer.getters
    }

})