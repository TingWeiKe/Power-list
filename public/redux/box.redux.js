const SUCCESS = 'SUCCESS'

let initState = {
    msg: '',
    data:{},
    urlParam:''
}

export function box(state = initState, action) {
    switch (action.type) {
        case SUCCESS:
            return state = { ...state, msg: "success" }
        default:
            return state
    }


}

export function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        vars[key] = value
    })
    return {type:SUCCESS}
}

export async function get_code_from_url() {
    const urlPara = this.getUrlVars()
    if (urlPara != null) {
        const res = await axios.post('http://localhost:3000/post', { urlPara: urlPara })
        try {
            return res.data
        } catch{
            console.log('error')
        }
    }
}


export async function get_KKbox_API(access_token) {
    let url = 'https://api.kkbox.com/v1.1/featured-playlists'
    let config = {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + access_token }
    }
    try {
        const res = await axios.get(url, config)
        let data = res.data.data
        return data
    }
    catch (error) {
        console.log(error)
    }
}