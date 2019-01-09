import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get_Playlists_Id_Api, hadndle_Init_State } from '../../redux/playlist.redux'
import { Button, Grid, Image, Loader } from 'semantic-ui-react'

import './playlist.css'
function modify_updated_at(x) {
  let l = ['年', '月', '日']
  let d = x.split('T')[0]
    .split('-')
    .map((a, i) => { return a + l[i] })
    .join('')
  let t = x.split('T')[1]
    .split('+')[0].split(':')
  let tt = parseInt(t[0]) + 8
  let subt;
  if (tt > 12) {
    let y = parseInt(t[0]) + 4
    subt = '下午' + y + '點'
  }
  else {
    let y = parseInt(t[0]) - 4
    subt = '上午' + y + '點'
  }
  return d+' '+subt+t[2]+'分'
}

function content(data) {
  return <Grid stackable={true} textAlign={"left"}>
    {console.log(data)
    }
    <Grid.Column widescreen={8}>
      <h1>{data.title}</h1>
      <Button className='play' fluid>Fits to Container</Button>
      <Grid>

        <Grid.Column width={16}>
          <Image src={data.images[2].url} />
          <div className='playlist_text_box'>

            <div className='list_description'>
              <pre>{data.description}</pre>
            </div>
            <div className='play_text'>
              <a href={data.owner.url}><p>作者；{data.owner.name}</p></a>
              <p>更新：{modify_updated_at(data.updated_at)}</p>
            </div>
          </div>
        </Grid.Column>


      </Grid>
    </Grid.Column>
    <Grid.Column widescreen={8}>
      {data.tracks.data.length > 0 ? data.tracks.data.map(data=>{
        return <div className ="track">
        <p>{data.name}</p>
        </div>
      }):null}
    </Grid.Column>
  </Grid>

}


class Playlist extends Component {

  function
  componentDidMount() {
    let playlist_id = this.props.location.pathname.replace('/playlist/', '')
    let url = 'https://api.kkbox.com/v1.1/featured-playlists/' + playlist_id + '?territory=TW'
    // console.log(url);
    // console.log(playlist_id)
    console.log(this.props)
    this.props.get_Playlists_Id_Api(playlist_id)
  }
  componentWillUnmount() {
    this.props.hadndle_Init_State()
  }
  render() {
    let data = this.props.data.playlist.playlist_data
    const bool = this.props.data.playlist.bool;
    return (
      <div className='header'>

        <Button className='back' onClick={this.props.history.goBack}>
          <span herf='#'> 返回 </span>
        </Button>
        <Loader active={bool} inline='centered' size='huge' disabled />
        {Object.keys(data).length ? content(data) : null}

      </div>

    )

  }
}

const mapStatetoProps = state => {
  return { data: state }
}
const actionCreate = { get_Playlists_Id_Api, hadndle_Init_State }
Playlist = connect(mapStatetoProps, actionCreate)(Playlist)

export default withRouter(Playlist)

