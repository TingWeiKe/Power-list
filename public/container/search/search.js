import React, { Component } from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react';
import Search_input from '../../component/search_input/search_input';
import { Link } from 'react-router-dom'

export default class search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    render() {

        console.log(this.props.location.state);

        return (
            <div className="header">
                <h1>歌單</h1>
                <Search_input />
                {this.props.location.state.summary.total > 0 ? <h2 className='subheader'> 搜尋結果</h2> : null}
                <Grid columns={5} doubling={true} stackable>
                    {this.props.location.state.summary.total > 0 ? this.props.location.state.playlists.data.map(data => {
                        return <Grid.Column>
                            <div className='feature_content'>
                                <Link to={'/playlist/' + data.id} id={data.id}>
                                    <Segment className='feature_box'>
                                        <Image className='category_img' src={data.images[0].url}></Image>
                                        <div className='title_box'>
                                            <h3 className="category_title">{data.title}</h3>
                                        </div>
                                    </Segment>
                                </Link>
                            </div>
                        </Grid.Column>

                    }) : <h2 className='subheader'>沒有搜尋結果</h2>}
                </Grid>
            </div>
        )
    }
}
