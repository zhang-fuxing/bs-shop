import {useRouter} from "vue-router";
const router = useRouter()
export  const toProductInfo = (pid) => {
    router.push('/product/' + pid)
}