import React, { Component } from 'react'
import './feature.css'
import { Grid, Image, Segment, } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class feature extends Component {

    render() {
        console.log(this.props);

        return (
            <div>
                <Grid columns={3} stackable>
                    {this.props.data !== undefined ? this.props.data.map(data => {
                        return <Grid.Column>
                            <Link to={'/playlist/' + data.id}>
                                <Segment className='feature_box'>
                                    <Image className='category_img' src={data.images[0].url}></Image>
                                    <div className='title_box'>
                                        <h3 className="category_title">{data.title}</h3>
                                    </div>
                                </Segment>
                            </Link>
                        </Grid.Column>



                    }) : null}
                </Grid>
            </div>
        )
    }

}


// {this.props.data!==undefined ?this.props.data.map(data=>{
//     return  <Grid columns={3} doubling stackable>
//         <Grid.Column>
//         <Link to={'/playlist/' + data.id}>
//             <Segment className='feature_box'>

//                 <Image className='category_img' src={data.images[0].url}></Image>
//                 <h3 className="category_title">{data.title}</h3>

//             </Segment>
//             </Link>
//         </Grid.Column>

//     </Grid>

// }):null}



export default feature