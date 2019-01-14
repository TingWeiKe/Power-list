import React, { Component } from 'react'
import { Input, Form, Loader,Dimmer } from 'semantic-ui-react'
import {get_KKbox_API,getCookie} from '../getKKboxAPI'
import {withRouter} from 'react-router-dom'
class Search_input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            bool:false,
            title: ''
        }
    }
    handle_Seach(value) {
        this.setState({bool:true , title:''})
        this.props.history.push('/search',{})
        let url = 'https://api.kkbox.com/v1.1/search?q='+value+'&type=playlist&territory='+localStorage.getItem('language')+'&limit=50'
        get_KKbox_API(getCookie('token'),url)
        .then(res=>{
            this.props.history.push('/search',res.data)
            this.setState({bool:false , title:'“'+ value+ '“' + '：的搜尋結果'})
        })
        console.log(value);

    }

    render() {
        return (
           
            <Form onSubmit={() => {this.handle_Seach(this.state.value) }}>
                 
                <Input
                    placeholder='搜尋歌單...'
                    onChange={(e, { value }) => {
                        this.setState({ value: value })
                    }}/>
                    
                    <Loader content='搜尋中...' className='loader' active={this.state.bool} inline='centered' size='huge' disabled />
                    <h1 style={{marginBottom:'40px'}}>{this.state.title}</h1>
                    
            </Form>
        )
    }
}

export default  withRouter(Search_input) 