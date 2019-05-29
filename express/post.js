const express = require('express')
const router = express.Router()
const axios = require('axios')
const token = require('./token')
const grant_type = 'authorization_code'
let code = ''
const request = require('request')
const Qs = require('qs')
const { kkbox_client_id, kkbox_client_secret, spotify_client_id, spotify_client_secret } = token

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//  Local http://localhost:9000/mylist
//  Production https://power-list.herokuapp.com/today
const mylist_redirect_url = 'http://localhost:9000/mylist'

router.post('/refresh', function(req, res, next){
	const data = Qs.stringify({
		grant_type: 'refresh_token',
		refresh_token: req.body.code,
		client_id: kkbox_client_id,
		client_secret: kkbox_client_secret
	})
	const config = {
		method: 'post',
		url: 'https://account.kkbox.com/oauth2/token',
		headers: {
			host: 'account.kkbox.com',
			'content-type': 'application/x-www-form-urlencoded'
		},
		// Must be a String in content-type: application/x-www-form-urlencoded
		data: data
	}

	axios(config)
		.then(data => {
			console.log(data)
			res.json(data)
		})
		.catch(error => {
			res.json(error)
		})
})

router.post('/', function(req, res, next){
	//Use raw String
	const formData = 'grant_type=' + req.body.grant_type + '&code=' + req.body.urlPara
	const config = {
		method: 'post',
		url: 'https://account.kkbox.com/oauth2/token',
		headers: {
			Authorization: 'Basic ' + new Buffer(kkbox_client_id + ':' + kkbox_client_secret).toString('base64'),
			'content-type': 'application/x-www-form-urlencoded'
		},
		// FormData FormData must be a String /
		data: formData
	}

	axios(config)
		.then(data => {
			console.log(data.data)
			res.json(data.data)
		})
		.catch(error => {
			res.json(error)
		})
})

function parseHtmlEntities(str){
	return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr){
		var num = parseInt(numStr, 10) // read num as normal number
		return String.fromCharCode(num)
	})
}

router.post('/youtube', function(req, res, next){
	const string = req.body.name.name.length > 50 ? req.body.name.name.substring(0, req.body.name.name.length / 2) : req.body.name.name
	const url = 'https://www.youtube.com/results?search_query=' + string
	request(encodeURI(url), (err, r, body) => {
		if (err) {
			res.status(500).json(new Error(err))
		} else {
			if (r.statusCode === 200) {
				let x = body.split('href="/watch?v=')
				let id = x[1].substring(0, 11)
				let title = parseHtmlEntities(x[2].split('title="')[1].split('" ')[0]).replace(/(&quot\;)/g, '"')
				if (id.length !== 11) {
					throw 'Error Video_Id'
				}
				res.json({ id, title })
				console.log(id, title)
			}
		}
	})
})

router.post('/pushTracks', function(req, res, next){
	const id = req.body.id.toString()
	let access_token = req.body.access_token

	request.post(
		'https://api.kkbox.com/v1.1/me/favorite',
		{
			headers: {
				Authorization: 'Bearer ' + access_token,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				track_id: id
			})
		},
		(error, response, body) => {
			res.send(body)
		}
	)
})

router.post('/loggin_kkbox', (req, res) => {
	res.json('https://account.kkbox.com/oauth2/authorize?redirect_uri=' + encodeURIComponent(mylist_redirect_url) + '&client_id=' + kkbox_client_id + '&response_type=code&state=123')
})

router.post('/loggin_spotify', (req, res) => {
	const scopes = 'user-read-private user-read-email user-library-read'
	res.json('https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' + spotify_client_id + (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + '&redirect_uri=' + encodeURIComponent(mylist_redirect_url))
})

router.post('/loggin_spotify_callback', (req, res) => {
	const url = 'https://accounts.spotify.com/api/token'
	const data = Qs.stringify({
		code: req.body.code,
		redirect_uri: mylist_redirect_url,
		grant_type: 'authorization_code',
		client_id: spotify_client_id,
		client_secret: spotify_client_secret
	})

	const config = {
		method: 'post',
		url: url,
		data: data
	}

	axios(config)
		.then(data => {
			res.send(data.data)
			console.log(data.data)
		})
		.catch(err => {
			res.send(new Error(err))
			console.log(err)
		})
})

router.post('/refresh_spotify', (req, res) => {
	const url = 'https://accounts.spotify.com/api/token'
	const data = Qs.stringify({
		grant_type: 'refresh_token',
		refresh_token: req.body.refresh_token
	})

	const config = {
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64')
		},
		method: 'post',
		url: url,
		data: data
	}

	axios(config)
		.then(data => {
			res.json(data.data)
		})
		.catch(err => {
			res.send(new Error(err))
			console.log(err)
		})
})

router.post('/put_spotify_track', (req, res) => {
	const id = req.body.id
	const access_token = req.body.access_token
	const options = {
		method: 'PUT',
		url: 'https://api.spotify.com/v1/me/tracks',
		qs: { ids: id },
		headers: {
			'cache-control': 'no-cache',
			accept: 'application/json',
			authorization: 'Bearer ' + access_token,
			'content-type': 'application/json'
		}
	}

	request(options, function(error, response, body){
		if (error) {
			throw error
		}
		res.send(body)
	})
})

module.exports = router
