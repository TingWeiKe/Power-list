var express = require('express');
var router = express.Router();
let axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let grant_type = 'authorization_code'
let code = ''
let request = require("request");
let Qs = require('qs');

const kkbox_client_id = 'b89dc89b34b7f4d2759580c9b53141ae'
const kkbox_client_secret = 'c47d5eebae5d6cf9da082e55447d4ec8'

const spotify_client_id = '3d6feac295e24ced8496590335a261ef'
const spotify_client_secret = 'f2f58350880048699c74dcf8775b1eb1'
const mylist_redirect_url = 'http://localhost:9000/mylist'
//  Local http://localhost:9000/mylist
//  Production https://kkboxoauth2.herokuapp.com/mylist

router.post('/refresh', function (req, res, next) {
  let code = req.body.code
  async function get_refresh_access_data() {
    //FormData must be a String in order to fit in content-type: application/x-www-form-urlencoded
    //Use Qs.stringify
    let data = Qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: code,
      client_id: kkbox_client_id,
      client_secret: kkbox_client_secret
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
  async function get_access_data() {
    //FormData must be a String in in content-type: application/x-www-form-urlencoded prevent Axios JSON it again.
    //Use raw String
    let formData = 'grant_type=' + req.body.grant_type + '&code=' + req.body.urlPara
    let config = {
      method: 'post', url: 'https://account.kkbox.com/oauth2/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(kkbox_client_id + ':' + kkbox_client_secret).toString('base64')),
        'content-type': 'application/x-www-form-urlencoded'
      },
      // FormData FormData must be a String /
      data: formData
    }
    const res = await axios(config)
    return res.data
  }

  get_access_data(grant_type, code)
    .then(data => {
      console.log(data);
      data.access_token ? res.json(data) : res.json('No access_token')
    }).catch(error => {
      res.json('error')
    }
    )
});


router.post('/youtube', function (req, res, next) {
  let string = req.body.name.name.length > 50 ? req.body.name.name.substring(0, req.body.name.name.length / 2) : req.body.name.name
  console.log(string)
  let url = "https://www.youtube.com/results?search_query=" + string
  request(encodeURI(url), (err, r, body) => {
    if (r.statusCode === 200) {
      let x = body.split('href="/watch?v=')
      let id = (x[1]).substring(0, 11)
      let title = ((x[2]).split('title="')[1].split('" ')[0])
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

// router.post('/push_tracks', function (req, res, next) {
//   let id = (req.body.id).toString()
//   let access_token = 'sHS2ey0UVYzICN6zcr5g6w=='

//   request.post('https://api.kkbox.com/v1.1/me/favorite', {
//     headers: {
//       'Authorization': 'Bearer ' + access_token,
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       "track_id": id
//     })
//   }, (error, response, body) => {
//     res.send(body)
//   })

// })

router.post('/loggin_kkbox', (req, res) => {
  let rd_url = 'http://localhost:9000/mylist'

  res.json('https://account.kkbox.com/oauth2/authorize?redirect_uri='+encodeURIComponent(mylist_redirect_url)+
  '&client_id='+kkbox_client_id +'&response_type=code&state=123'
  )
})



router.post('/loggin_spotify', (req, res) => {
  let sp_my_client_id = '3d6feac295e24ced8496590335a261ef'
  let scopes = 'user-read-private user-read-email user-library-read';
  res.json('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + sp_my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(mylist_redirect_url));
})

router.post('/loggin_spotify_callback', (req, res) => {
  let code = req.body.code
  let url = 'https://accounts.spotify.com/api/token'
  let data = Qs.stringify({
    code: code,
    redirect_uri: mylist_redirect_url,
    grant_type: 'authorization_code',
    client_id: '3d6feac295e24ced8496590335a261ef',
    client_secret: 'f2f58350880048699c74dcf8775b1eb1'
  })

  const config = {
    method: 'post', url: url, data: data
  }

  axios(config)
    .then(data => {
      console.log(data.data);

      res.send(data.data)
    })
    .catch(err => {
      console.log(err)
    })
})


router.post('/refresh_spotify', (req, res) => {
  let url = 'https://accounts.spotify.com/api/token'
  let data = Qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: req.body.refresh_token
  })

  const config = {
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64')) },
    method: 'post',
    url: url,
    data: data
  }

  axios(config)
    .then(data => {
      res.json(data.data)
    })
    .catch(err => {
      throw (err)

    })
})

router.post('/put_spotify_track', (req, res) => {

  console.log(req.body.access_token);
  let id = req.body.id
  let access_token = req.body.access_token
  var options = {
    method: 'PUT',
    url: 'https://api.spotify.com/v1/me/tracks',
    qs: { ids: id },
    headers:
    {
      'cache-control': 'no-cache',
      accept: 'application/json',
      authorization: 'Bearer ' + access_token,
      'content-type': 'application/json'
    }
  };

  request(options, function (error, response, body) {
    if (error){
     throw(error)
    }
    res.send(body)
    console.log('success');
    console.log(body);
  });

})

module.exports = router;