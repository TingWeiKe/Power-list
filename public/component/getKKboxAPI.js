import axios from 'axios'
let authorization_code = 'authorization_code'
let client_credentials = 'client_credentials'



function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        vars[key] = value
    })
    return vars["code"] ? vars["code"] : null
}



export async function get_Access_Token_From_urlParam() {
    let urlPara = getUrlVars()
    if (urlPara) {
        const res = await axios.post('http://localhost:3000/post', { grant_type: authorization_code, urlPara: urlPara })
        try {
            return res.data
        } catch{
            console.log('error')
        }
    }
}


export async function get_Access_Token() {
    const res = await axios.post('http://localhost:3000/post', { grant_type: client_credentials })
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
    let l = ['年', '月', '日']
    let d = x.split('T')[0]
      .split('-')
      .map((a, i) => { return a + l[i] })
      .join('')
    let t = x.split('T')[1]
      .split('+')[0].split(':')
    let tt = parseInt(t[0]) + 8
    let subt;
    if (tt > 12) {
      let y = parseInt(t[0]) + 4
      subt = '下午' + y + '點'
    }
    else {
      let y = parseInt(t[0]) - 4
      subt = '上午' + y + '點'
    }
    return d+' '+subt+t[2]+'分'
  }