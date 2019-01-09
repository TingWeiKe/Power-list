import React, { Component } from 'react'
import { Link, Router, Route } from 'react-router-dom'
import { Image, Grid, Icon, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { get_Featured_Playlists_Api } from '../../redux/box.redux'
import './box.css'
import { icon } from './box.img'

function content(data) {
    return <div key={data.id} className='playlist'>
        <Grid.Column>
            <Link to={'/playlist/' + data.id} id={data.id}>
                <Image style={{ width: ' 100%' }} centered={true} className='img' src={data.images[0].url}>
                </Image>
            </Link>
            <Link to={'/playlist/' + data.id} id={data.id}>
                <Image className="icon" src={icon} bordered={true}></Image>
            </Link>
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
}

class Box extends Component {

    componentDidMount() {

        this.props.get_Featured_Playlists_Api()

    }

    render() {
        console.log(this.props)
        let data = this.props.data.box.box_data
        let bool = this.props.data.box.bool
    
        return (
            <Grid>
                <Grid.Row>
                    <Loader active={bool} inline='centered' size='huge' disabled />
                    {data.length > 0 ? data.map(data => {
                        return content(data)
                    }) : null }
                    
                </Grid.Row>
            </Grid>
        )
    }
}
const mapStatetoProps = state => {
    return { data: state }
}
const actionCreate = { get_Featured_Playlists_Api }
Box = connect(mapStatetoProps, actionCreate)(Box)
export default Box