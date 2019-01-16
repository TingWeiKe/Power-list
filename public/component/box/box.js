import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image, Grid, Loader } from 'semantic-ui-react'
import './box.css'
import { icon } from './box.img'
import { modify_updated_at } from '../getKKboxAPI'

class Box extends Component {

    render() {
        let data = this.props.data
        let title = this.props.title
        let bool = this.props.bool
        return (
            <div className="header">
             
                <h1>{title}</h1>
                <Loader content='載入中...' className='loader' active={bool} inline='centered' size='huge' disabled />
                <Grid>
                    <Grid.Row>
                        {data ? data.map(data => {
                            return <div key={data.id} className='playlist'>
                                <Grid.Column>
                                    <Link to={'/playlist/' + data.id} id={data.id}>
                                        <Image style={{ width: ' 100%' }} centered={true} className='img' src={data.images[0].url}>
                                        </Image>
                                    </Link>
                                    <Link to={'/playlist/' + data.id} id={data.id}>
                                        <Image className="play_icon" src={icon} bordered={true}></Image>
                                    </Link>
                                    <div style={{ cursor: 'default' }}>
                                        <div className='title'>
                                            <a href={data.url}><h2>{data.title}</h2></a>
                                        </div>
                                        <div className='description'>
                                            <p >{data.description}</p>
                                        </div>
                                        <div className='text'>
                                            <a href={data.owner.url}><p>作者：{data.owner.name}</p></a>
                                            <p>更新：{modify_updated_at(data.updated_at)}</p>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </div>
                        }) : null}
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Box