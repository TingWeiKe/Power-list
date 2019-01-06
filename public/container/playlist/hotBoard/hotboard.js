import React, { Component } from 'react'
import axios from 'axios'
import { Image } from 'semantic-ui-react'
export default class hotboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
           data:[]
        }
    }

    getUrlVars() {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
            vars[key] = value
        })
        return vars["code"] ? vars["code"] : null
    }

    async get_code_from_url() {
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


    async get_KKbox_API(access_token) {
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
    componentDidMount() {
        this.get_code_from_url()
            .then(data => {
                this.get_KKbox_API(data.access_token)
                    .then(data => {
                        this.setState({ data: data })
                        data ? this.setState({ v: false }) : null
                        console.log(this.state.data)

                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
   
    }

  render() {
      
    return (
      <div>
          {this.state.data.map(data=>{
                    return <Image src={data.images[0].url}></Image>
                })}
      </div>
    )
  }
}
