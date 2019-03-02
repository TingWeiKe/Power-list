import axios from 'axios'
let authorization_code = 'authorization_code'
let client_credentials = 'client_credentials'

export function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        vars[key] = value
    })
    return vars["code"] ? vars["code"] : ''
}


export async function get_Access_Token_From_urlParam() {
    let urlPara = getUrlVars()
    if (urlPara) {
        const res = await axios.post('/post', { grant_type: authorization_code, urlPara: urlPara })
        try {
            return res.data
        } catch{
            console.log('error')
        }
    }
}


export async function get_Access_Token() {
    const res = await axios.post('/post', { grant_type: client_credentials })
    try {
        return res.data
    } catch{
        console.log('error')
    }
}

export async function get_KKbox_API(access_token, url) {
    let config = {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + access_token }
    }
    try {
        const res = await axios.get(url, config)
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export function doCookieSetup(name, value, time) {
    var expires = new Date();
    //cookie expire time 1m30s
    expires.setTime(expires.getTime() + time);
    document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString()
}


export function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

export function modify_updated_at(x) {
    let k = new Date(x)
    let kk = k.toLocaleDateString()
    let l = ['年', '月', '日']
    let date = kk.split('/')
        .map((d, i) => { return d + l[i] }).join('')

    let time = k.toLocaleTimeString().split(':')
    return date + ' ' + time[0] + '點' + time[1] + '分'
}

export function push_Track(id){
    axios.post('/post/push_tracks', { id: id })
    .then(res=>{
        console.log(res);
    })
}