import React, { Component } from 'react'
import axios from 'axios'
import { Image, Grid } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'
import {connect} from 'react-redux'  
import {getUrlVars} from '../../redux/box.redux'
import './box.css'

class Box extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            v:true,
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
                        data?this.setState({v:false}):null
                        console.log(this.state.data)

                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            this.props.getUrlVars()
    }
   
    render() {
        console.log(this.props)
        const s = this.state.v
        return (
            <Grid>
                <Grid.Row>
                <Loader active={s} inline='centered' size='huge' disabled />
                 
                    {this.state.data ? this.state.data.map(data => {
                        return <div key ={data.id} className='playlist'>
                            <Grid.Column>
                                <a href={data.url}>
                                    <Image style={{width:' 100%'}} centered={true} className='img' src={data.images[0].url}></Image>
                                </a>
                                <div className='title'>
                                    <a href={data.url}><h2>{data.title}</h2></a>
                                </div>
                                <div className='description'>
                                    <p >{data.description}</p>
                                </div>
                                <div className='text'>
                                    <a href={data.owner.url}><p>{data.owner.name}</p></a>
                                    <p>{data.updated_at}</p>
                                </div>
                            </Grid.Column>
                        </div>
                    }) : null}
                
                </Grid.Row>
            </Grid>
        )
    }
}
const mapStatetoProps = state =>{
    return {num:state}
}
const actionCreate = {getUrlVars}
Box = connect(mapStatetoProps,actionCreate)(Box)
export default Box