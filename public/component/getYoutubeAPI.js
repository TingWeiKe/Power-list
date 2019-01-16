var axios = require('axios');
var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function searchYouTube (params) {

  if (!params.key) {
    throw new Error('Please provide a API key parameter');
  }

  if(!params.part){
      params.part = 'snippet';
  }

  if(!params.maxResults){
      params.maxResults = 5;
  }

  if(!params.type){
      params.type = 'video';
  }

  await axios.get(ROOT_URL, { params: params })
    .then(res=>{
      console.log(res);
    })
    .catch(function(error) {
      console.error(error);
    });
};



