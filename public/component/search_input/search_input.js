import React, { Component } from 'react'
import { Input, Form } from 'semantic-ui-react'
import {get_KKbox_API,getCookie} from '../getKKboxAPI'
import {withRouter} from 'react-router-dom'
class Search_input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    handle_Seach(value) {
        let url = 'https://api.kkbox.com/v1.1/search?q='+value+'&type=playlist&territory='+localStorage.getItem('language')+'&limit=50'
        get_KKbox_API(getCookie('token'),url)
        .then(res=>{
            this.props.history.push('/search',res.data)
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
                    }}
                />

            </Form>
        )
    }
}

export default  withRouter(Search_input) 