import React, { Component } from 'react'
import { Grid, Image, Segment, } from 'semantic-ui-react'
import { Link, } from 'react-router-dom'
import { connect } from 'react-redux'
import { handle_Init_State } from '../../../redux/box.redux'

class category extends Component {
    render() {
        return (
            <Grid columns={4} doubling={true} stackable>
                {this.props.data.category.category_data.data !== undefined ? this.props.data.category.category_data.data.map(data => {
                    return <Grid.Column key={data.id}>
                        <div className='feature_content'>
                            <Link onClick={()=>{this.props.handle_Init_State()}} to={{ pathname: '/category/' + data.id, url: 'https://api.kkbox.com/v1.1/featured-playlist-categories/' + data.id + '?territory='+this.props.language }}>
                                <Segment className='feature_box'>
                                    <Image className='category_img' src={data.images[0].url}></Image>
                                    <div className='title_box'>
                                        <h3 className="category_title">{data.title}</h3>
                                    </div>
                                </Segment>
                            </Link>
                        </div>
                    </Grid.Column>
                }) : null}
            </Grid>
        )
    }
}
const mapStatetoProps = state => {
    return { data: state }
}
const actionCreate = {   handle_Init_State  }
category = connect(mapStatetoProps, actionCreate)(category)
export default category