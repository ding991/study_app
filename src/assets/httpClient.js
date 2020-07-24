import axios from 'axios'
import qs from 'qs'

// import SimpleToast from 'react-native-simple-toast';

axios.interceptors.request.use(config => {

    // config.headers.token = appStore.user.token
    
    return config
})

//在两个方法中，返回非Promise的值或者返回Promise.resolve均会进入成功的回调，而如果返回Promise.reject则会进入catch回调
axios.interceptors.response.use(({ data, config }) => {
    let { data: res, code, message, success } = data
    if(/yun\./.test(config.url)) {
        return data
    }
    if(code === 400) { //未登录，或者登陆失效
        // appStore.logout()
        return Promise.reject('未登录')
    }
    if(success === false) {
        return Promise.reject(data)
    }
    if (code === undefined) {
        log(config, res)
        return data
    }
    if(code !== 200) { //其他错误,返回msg字段作为业务错误的标志
        // SimpleToast.show(data.message)
        log(config, res, message, false)
        return { msg: message }
    }
    log(config, data)
    return data || {}
}, err => {
    return Promise.reject(err)
})

function parseURL (URL) {
    let [ url, query ] = URL.split('?'), queryData = {}
    if(query) {
        queryData = qs.parse(query)
    }
    return {url, queryData}
}

//统一处理请求失败的回调
function errCatch (err) {
    if(__DEV__) { //骗自己
        // SimpleToast.show(typeof err === 'string' ? err : '网络错误！')
    }
    if(err.config) { //处理来自axios的错误
        log(err.config, {}, err.message)
    } else {
        console.info('httpClient[error]:', err)
    }
}

function log (config, res={}, msg='', type=true) {
    let params
    if(config.method === 'get') {
        params = JSON.stringify(config.params)
    } else {
        params = config.data
    }
    console.log(`
        接口调用${type ? '正常' : '出错'}:
        method: ${config.method}
        msg: ${msg ? msg : ''}
        url: ${config.url}
        params: ${params}
        res: ${JSON.stringify(res)}
    `.replace(/ /g, '').replace(/\n\s/g, ''))
}

function proxy (method = 'get', ...otherParams) {
    axios.defaults.baseURL = `http://192.168.1.64:3000`
    return new Promise(resolve => {
        axios[method].apply(axios, otherParams).then(res => {
            resolve(res)
        }).catch(errCatch)
    })
}

const $get = (URL, data = {}, server = 'agms') => {
    let {url , queryData} = parseURL(URL)
    queryData = Object.assign(queryData, data)
    return proxy('get', url, { params: queryData })
}

const $post = (URL, data) => proxy('post', URL, data)

const $delete = (URL, data) =>  proxy('delete', URL, data)

//以下三种请求方式均可以
// $get('sd/lk', {a: 1, b: 3})
// $get('sd/lk?k=2')
// $get('/sd/lk')

export default {
    baseURL: axios.defaults.baseURL,
    $get,
    $post,
    $delete
}