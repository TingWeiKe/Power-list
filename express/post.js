var express = require('express');
var router = express.Router();
let axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let grant_type = 'authorization_code'
let code = ''
var request = require("request");
var qs = require("querystring");
var http = require("https");
var Qs = require('qs');





router.post('/refresh', function (req, res, next) {


  let code = req.body.code

  // POST access_token from KKbox
  async function get_refresh_access_data() {
    //FormData must be a String in order to fit in content-type: application/x-www-form-urlencoded
    //Use Qs.stringify
    let data = Qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: code,
      client_id: 'b89dc89b34b7f4d2759580c9b53141ae',
      client_secret: 'c47d5eebae5d6cf9da082e55447d4ec8'
    })
    let config = {
      method: 'post', url: 'https://account.kkbox.com/oauth2/token',
      headers: { 'host': 'account.kkbox.com', 'content-type': 'application/x-www-form-urlencoded' },
      // Must be a String in content-type: application/x-www-form-urlencoded
      // Otherwise Axios will FUCKING JSON IT !!!
      data: data
    }
    const res = await axios(config)

    return res.data
  }


  get_refresh_access_data()
    .then(data => {
      console.log(data)
      res.json(data)
    }).catch(error => {
      res.json(error)
    })
});




router.post('/', function (req, res, next) {
  /* POST access_token from KKbox */
  async function get_access_data() {
    //FormData must be a String in in content-type: application/x-www-form-urlencoded prevent Axios JSON it again.
    //Use raw String
    let formData = 'grant_type=' + req.body.grant_type + '&code=' + req.body.urlPara + '&client_id=b89dc89b34b7f4d2759580c9b53141ae&client_secret=c47d5eebae5d6cf9da082e55447d4ec8'
    let config = {
      method: 'post', url: 'https://account.kkbox.com/oauth2/token',
      headers: { 'host': 'account.kkbox.com', 'content-type': 'application/x-www-form-urlencoded' },
      // FormData FormData must be a String /
      data: formData
    }
    const res = await axios(config)
    return res.data
  }

  get_access_data(grant_type, code)
    .then(data => {
      console.log(data)
      console.log(req.body)
      data.access_token ? res.json(data) : res.json('No access_token')
    }).catch(error => {
      res.json('error')
    }
    )
});




router.post('/youtube', function (req, res, next) {
  console.log(req.body.name.name)
  let string = req.body.name.name
let url = "https://www.youtube.com/results?search_query=" + string
console.log(url);
  request(encodeURI(url), (e, r, body) => {
    let x = body.split('href="/watch?v=')
    let yy =(x[1]).split('"')[0]
    res.json(yy)
  console.log(yy)
})




});


module.exports = router;
