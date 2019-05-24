import React, { Component } from 'react'
import './feature.css'
import { Grid, Image, Segment, } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Feature extends Component {

    render() {
        return (
            <Grid columns={4} doubling={true} stackable>
                {this.props.data !== undefined ? this.props.data.map(data => {
                    return <Grid.Column key={data.id}>
                        <div className='feature_content'>
                            <Link className='link' to={'/playlist/' + data.id}>
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


export default Feature