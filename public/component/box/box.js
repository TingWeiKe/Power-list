import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, } from 'antd';
import { style } from './box.css.js'


class Box extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
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

    componentDidMount() {
        this.get_code_from_url()
            .then(data => {
                this.get_KKbox_API(data.access_token)
                    .then(data => {
                        this.setState({ data: data })
                        console.log(this.state.data)

                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

    }
    render() {

        return (

            <Row type="flex" justify="center">
                {this.state.data ? this.state.data.map(data => {
                    return <Col xs={24} md={12} lg={9} style={style.col}>
                        <div style={style.playlistBox}>
                            <a href={data.url} style={style.a}>
                                <img style={style.img} src={data.images[0].url} />
                                <div style={style.text}>
                                    <h2>{data.title}</h2>
                                    <p style={style.description}> {data.description}</p>
                                    <p style={style.owner}>作者：{data.owner.name}</p>
                                    <p style={style.updated} >{data.updated_at}</p>
                                </div>
                                
                            </a>

                        </div>
                    </Col>
                }) : null}
            </Row>

        )
    }
}
export default Box