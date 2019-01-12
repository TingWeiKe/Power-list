import React, { PureComponent } from 'react'
import { Grid, Image, Segment, } from 'semantic-ui-react'
import { Link, } from 'react-router-dom'


class category extends PureComponent {
    render() {
        console.log(this.props.data)
        return (
            <Grid columns={4} doubling={true} stackable>
                {this.props.data !== undefined ? this.props.data.map(data => {
                    return <Grid.Column key={data.id}>
                        <div className='feature_content'>
                            <Link to={{ pathname: '/category/' + data.id, url: 'https://api.kkbox.com/v1.1/featured-playlist-categories/' + data.id + '?territory=TW' }}>

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

export default category