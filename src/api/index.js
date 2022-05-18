
export const search='/product/search/'

// category api
export const categoryLevel1 = '/category/getAllLeve1'
export const categoryLevel2 = '/category/getAllLeve2'
export const lv2 = '/category/lv2ByLv1/'

// cart api
export const addCart = '/cart/add/'
export const cartList = '/cart/list'
export const removeCartItems = '/cart/remove/'


// product api
export const fileupload1 = '/pimage/file/head'
export const fileupload2 = '/pimage/file/detail'

export const carouselUpload = '/carousel/append'
export const icarouselList = '/carousel/list'
export const removeOneCarousel = '/carousel/remove/'

// /pimage/imgList/productId
export const productImage = '/pimage/imgList/'
export const addProduct = '/product/add'
export const products = '/product/list'
export const productCount = '/product/count'

export const productCount1 = '/product/count1/'
// /product/count2/{lv2Id}
export const productCount2 = '/product/count2/'

// /product/productInfo/{productId}
export const productInfo = '/product/productInfo/'

// 推荐列表 首页展示
export const rmlist = '/recommend/list'

export const removeRM = '/recommend/remove/'
export const addrm = '/recommend/add/'

// user api
export const login = '/user/login'
export const register = '/user/register'
export const userInfo = "/user/info"
export const updatePassword = '/user/updatePassword'

export const getEstimateByProduct = '/estimate/product/'
export const getEstimateByUser = '/estimate/user/'
export const addEstimate = '/estimate/add/'
export const estimateSet = '/estimate/user'
export const remakePwd = '/user/remake/'

export const freeze_api='/user/freeze/'
export const unfreeze_api='/user/unfreeze/'


// address api
export const getAddress = '/address/list'
export const getAddressById = '/address/getById/'
export const appendAddress = '/address/append'
export const setDefault='/address/setDefault/'
export const updateAddress='/address/update'
export const delAddress='/address/delete/'


export const checkEmail = '/user/checkEmail/'
export const checkUname = '/user/checkUname/'
export const checkPhone = '/user/checkPhone/'

export const verifyImg = 'http://localhost:9000/user/verify'
export const getUserList = '/user/admin/list'
export const getFreezeList = '/user/admin/freezeList'


export const uploadPreview = 'http://localhost:9000/pimage/file/1'
export const uploadDetails = 'http://localhost:9000/pimage/file/2'

//// order api
export const createOrder = '/order/addOrder'
export const createOrderByCart = '/order/addBatch/'

export const getOrderSet = '/order/listForUser'
export const getOrderSet1 = '/order/list'
export const getOrderReceive = '/order/receive'
export const getOrderReceive2 = '/order/receive2'
export const changeStatus = '/order/sendGoods/'
export const received = '/order/received/'



export const renderJson = {
    "widgetList": [{
        "key": 64420,
        "type": "rich-editor",
        "icon": "rich-editor-field",
        "formItemFlag": true,
        "options": {
            "name": "productDescription",
            "label": "商品描述",
            "placeholder": "",
            "labelWidth": null,
            "labelHidden": false,
            "contentHeight": "200px",
            "disabled": false,
            "hidden": false,
            "required": false,
            "requiredHint": "",
            "customRule": "",
            "customRuleHint": "",
            "customClass": [],
            "labelIconClass": null,
            "labelIconPosition": "rear",
            "labelTooltip": null,
            "minLength": null,
            "maxLength": null,
            "showWordLimit": false,
            "onCreated": "",
            "onMounted": "",
            "onValidate": ""
        },
        "id": "richeditor43432"
    }],
    "formConfig": {
        "modelName": "formData",
        "refName": "vForm",
        "rulesName": "rules",
        "labelWidth": 80,
        "labelPosition": "left",
        "size": "small",
        "labelAlign": "label-left-align",
        "cssCode": "",
        "customClass": "",
        "functions": "",
        "layoutType": "PC",
        "jsonVersion": 3,
        "onFormCreated": "",
        "onFormMounted": "",
        "onFormDataChange": ""
    }
}