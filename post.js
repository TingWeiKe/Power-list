var express = require('express');
var router = express.Router();
let axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let grant_type = 'authorization_code'
let code = ''
let request = require("request");
let Qs = require('qs');


router.post('/refresh', function (req, res, next) {


  let code = req.body.code
  // POST access_token from KKbox
  async function get_refresh_access_data() {
    //FormData must be a String in order to fit in content-type: application/x-www-form-urlencoded
    //Use Qs.stringify
    let data = Qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: code,
      client_id: 'b997488a13ddff79d7ee295d10302162',
      client_secret: '798c0a432e2c77dfc590b933f676ccac'
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
  let client_id='b997488a13ddff79d7ee295d10302162'
  let client_secret='798c0a432e2c77dfc590b933f676ccac'
  console.log( (new Buffer(client_id + ':' + client_secret).toString('base64')));
  
  async function get_access_data() {
    //FormData must be a String in in content-type: application/x-www-form-urlencoded prevent Axios JSON it again.
    //Use raw String
    let formData = 'grant_type=' + req.body.grant_type + '&code=' + req.body.urlPara 
    let config = {
      method: 'post', url: 'https://account.kkbox.com/oauth2/token',
      headers: {  'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')), 
      'content-type': 'application/x-www-form-urlencoded' },
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
  let string = req.body.name.name.length > 80 ? req.body.name.name.substring(0, req.body.name.name.length / 2) : req.body.name.name
  console.log(string)
  let url = "https://www.youtube.com/results?search_query=" + string
  request(encodeURI(url), (err, r, body) => {
    if (r.statusCode === 200) {
      let x = body.split('href="/watch?v=')
      let id = (x[1]).substring(0,11)
      let title = (x[2]).split('title="')[1].split('" ')[0]
      if (id.length !== 11) {
        throw ('Error Video_Id')
      }
      res.json({ id, title })
      console.log(id, title);

    } else {
      
      res.status(400).json(new Error(err))
    }
  })
});

router.post('/push_tracks', function (req, res, next) {

 
    let id = (req.body.id).toString()
    let access_token = 'sHS2ey0UVYzICN6zcr5g6w=='
 

    request.post('https://api.kkbox.com/v1.1/me/favorite', {
      headers: {
          'Authorization': 'Bearer ' + access_token,
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          "track_id": id
      })
  }, (error, response, body) => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(body);

      res.send(body)
  })
  
});

module.exports = router;