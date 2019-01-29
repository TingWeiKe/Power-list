import React, { Component } from 'react'
import { Grid, Image, Segment, Loader, Input, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';
import { get_KKbox_API, getCookie } from '../../component/getKKboxAPI'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {search_Data,get_Search_Next} from '../../redux/search.redux'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            bool: false,
            title: ''
        }
    }

    handle_Seach(value) {
        console.log('submit');
        
        this.setState({ bool: true, title: '' })
        this.props.search_Data(value, ()=>{
            this.setState({ bool: false, title: '“' + value + '“' + '：的搜尋結果' })
        })
       
        // this.props.history.push('/search', {})
        // let url = 'https://api.kkbox.com/v1.1/search?q=' + value + '&type=playlist&territory=' + localStorage.getItem('language') + '&limit=50'
        // get_KKbox_API(getCookie('token'), url)
        //     .then(res => {
        //         this.props.history.push('/search', res.data)
        //       

        //     })
    }
    hanlde_Next(){
        this.props.get_Search_Next(this.props.search.data.paging.next)
    }
    render() {
        console.log(this.props);
        console.log(this.state)
        return (
            <div className="container_header">
                <h1>搜尋</h1>
                <Form onSubmit={() => { this.handle_Seach(this.state.value) }}>
                    <Input placeholder='搜尋歌單...' onChange={(e, { value }) => { this.setState({ value: value }) }} />
                <Loader content='搜尋中...' className='loader' active={this.state.bool} inline='centered' size='huge' disabled />
                    <h1 style={{ marginBottom: '40px' }}>{this.state.title}</h1>
                </Form>
                <Grid columns={4} doubling={true} stackable>
                    {this.props.search.data.hasOwnProperty('playlists') ? this.props.search.data.playlists.data.map(data => {
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
                    }) : null}
                </Grid>
                {this.props.search.data.hasOwnProperty('playlists') ?  <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.hanlde_Next()}
                    hasMore={true}
                    loader={<Loader key='loader' style={{ color: 'white' }} active={false} content='載入中...' inline={'centered'} size='large' />}
                >
                    {null}
                </InfiniteScroll>:null}
                <div style={{ marginTop: '100px' }}></div>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return { search: state.search}
}
const actionCreate = { search_Data ,get_Search_Next}
Search = connect(mapStatetoProps, actionCreate)(Search)


export default withRouter(Search)
