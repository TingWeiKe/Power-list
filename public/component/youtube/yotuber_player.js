import React, { Component } from 'react'
import './yotuber_player.css'
import { Grid, Image, Button ,Responsive} from 'semantic-ui-react'
class Yotuber_player extends Component {



    render() {



        return (
            <Grid celled id='ytplayer'>

                <Grid.Row>
                    <Grid.Column style={{padding:'0px'}} width={2}>
                        <div className='movie_box'>
                        <Responsive minWidth={768}>
                            <iframe className="movie" frameborder="0" type="text/html" width="480" height="270"
                                allow="accelerometer;encrypted-media; gyroscope; picture-in-picture"
                                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&disablekb=1&enablejsapi=1"
                                frameborder="0" allowfullscreen>
                            </iframe></Responsive>
                            <div className= 'player_title'>跟著拉丁樂搖不停！（01/11 更</div>
                            <Button inverted size='mini' className='player-toggle-button'>放大畫面</Button>
                        </div>

                    </Grid.Column>
                    <Grid.Column width={12}>

                    </Grid.Column>
                    <Grid.Column width={3}>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Yotuber_player