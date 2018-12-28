// POST method to get access_code
// by Urls params from function get_Authorization_Code()
let axios = require('axios')
async function get_Authorization_Code() {
	const urlPara = getUrlVars()
	if (urlPara != null) {
		const res = await axios.post('/post', { urlPara: urlPara })
		try {
			return res.data
		} catch{
			console.log('error')
		}
	}
}


//get KKbox API  
async function get_KKbox_API(access_token) {
	let url = 'https://api.kkbox.com/v1.1/charts?territory=TW'
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

//POST method to get refresh_Token in order to get new accessCode from refresing.
async function get_Access_Code_by_Refresh_Token(refreshToken) {
	let url = '/post/refresh'
	const res = await axios.post(url, { code: refreshToken })
	try {
		return res.data
	} catch{
		console.log('error')
	}
}


//pure function (nice!!!)
//get users Url params
function getUrlVars() {
	let vars = {};
	let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
		vars[key] = value
	})
	return vars["code"] ? vars["code"] : null
}


// append Client DOM view
function appendData(data) {
	for (let x = 0; x < data.length; x++) {
		let content = `<div class="col">
					<a href=" ${data[x].url} "  style="text-decoration:none;">
					<div class='preview'>
						 <div id="placeholder">
						 <img src="${data[x].images[0].url}" onload="this.style.opacity=1"></div>
					</div>
					<div class='btm'> 
						<div class="icon">
							<img src="${data[x].images[0].url}">
						</div>
						<div class='intro'>
							<div class='channal_name'>${data[x].title}</div>
							<div class='real_name'>${data[x].updated_at}</div>
						</div>
					</div>
				</div>`;
		$(".row").append(content)
	}
}



function doCookieSetup(name, value) {
	var expires = new Date();
	//cookie expire time 1m30s
	expires.setTime(expires.getTime() + 150*1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString()
}
function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]); return null;
}

	// init 
	let newAccessToken = ''

// console.log(newAccessToken)

$(document).ready(function () {

	get_Authorization_Code().then(data => {
		doCookieSetup('currentToken', data.access_token)
		doCookieSetup('refreshToken', data.refresh_token)
		//拿access_token對伺服器請求KKbox API
		console.log(newAccessToken)
		data.access_token = newAccessToken ? null :newAccessToken = data.access_token
		console.log(newAccessToken)
		get_KKbox_API(newAccessToken)
			.then(data => {
				console.log(data)
				appendData(data)
			})


		// init the refresh_token to prevent expire
		let refreshToken = getCookie("refreshToken")
		// console.log(refreshToken)
		get_Access_Code_by_Refresh_Token(refreshToken)
			.then(data => {
				// console.log(data)
				data.refresh_token ? newAccessToken = data.access_token : console.log('Can not get new access_token')
				doCookieSetup('refreshToken', data.refresh_token)
				doCookieSetup('currentToken', newAccessToken)
			})

		//Refresh the Access_Token every 2 miniunt before expire time
		//get new refresh code and get new Access code by refreshing and save in cooke
		setInterval(() => {
			// console.log(refreshToken)
			let refreshToken = getCookie("refreshToken")
			get_Access_Code_by_Refresh_Token(refreshToken)
				.then(data => {
					console.log(data)
					data.refresh_token ? newAccessToken = data.access_token : console.log('Can not get new access_token')
					doCookieSetup('refreshToken', data.refresh_token)
					doCookieSetup('currentToken', newAccessToken)
				})
		}, 120 * 1000)
	})
})

//test get KKboxAPI
$('#test').click(() => {
	get_KKbox_API(newAccessToken)
		.then(res => {
			console.log(res)
		})
})


