import React, { Component } from 'react'
import { Grid, Image, Segment,Loader } from 'semantic-ui-react';
import Search_input from '../../component/search_input/search_input';
import { Link } from 'react-router-dom'
 class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    render() {
        // console.log(this.props.location);
        // console.log(this.props.location.state!==undefined )

        return (
            <div className="header">
                <h1>搜尋</h1>
                <Search_input />
                <Grid columns={4} doubling={true} stackable>
                    {this.props.location.state && this.props.location.state.hasOwnProperty('playlists')?  this.props.location.state.playlists.data.map(data => {
                        return <Grid.Column key={data.id}>
                            <div className='feature_content'>
                                <Link className='link' to={'/playlist/' + data.id} id={data.id}>
                                    <Segment className='feature_box'>
                                        <Image className='category_img' src={data.images[0].url}></Image>
                                        <div className='title_box'>
                                            <h3 className="category_title">{data.title}</h3>
                                        </div>
                                    </Segment>
                                </Link>
                            </div>
                        </Grid.Column>

                    }) :  null}
              
                </Grid>
            </div>
        )
    }
}


export default Search
