import React, { Component } from 'react'
import { Grid, Image, Segment,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
export default class recents extends Component {
    constructor(props){
        super(props)
        this.state={
            storage : localStorage.getItem('recent')
        }
    }
    init_State(){
        this.setState({storage:''})
        localStorage.clear('recent')
    }
    render() {
        return (
            <div className="header">
                <h1>最近播放</h1>
                <Button onClick={()=>this.init_State()}>清除</Button>
                <Grid columns={4} doubling={true} stackable>
                {this.state.storage?JSON.parse(this.state.storage).reverse().map(data=>{return <Grid.Column>
                         <div className='feature_content'>
                         <Link to={'/playlist/' + data.playlist_id} id={data.playlist_id}>
                                 <Segment className='feature_box'>
                                     <Image className='category_img' src={data.image_url.url}></Image>
                                     <div className='title_box'>
                                         <h3 className="category_title">{data.playlist_title}</h3>
                                     </div>
                                 </Segment>
                             </Link>
                         </div>
                     </Grid.Column>
               
                }):null}
                 </Grid>
            </div>
        )
    }
}
