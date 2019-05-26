import React from 'react'
import { Button, Grid, Image } from 'semantic-ui-react'
import './kkItem.scss'
export default function KkItem(props){
	return (
		<div className='kk_item' key={props.id}>
			<Grid.Row>
				<Button className='kk_play_button' fluid onClick={props.handle_play_button}>
					<Grid.Column width={3}>
						{props.songName == props.trackName ? <Image className='play_Icon' src={props.icon} /> : null}
						<Image className='playlist_img' src={props.imgSrc} />
					</Grid.Column>
					<Grid.Column width={6}>
						<div className='playlist_info'>
							<h3>{props.trackName}</h3>
							<p>{props.artistName}</p>
						</div>
					</Grid.Column>
					<Grid.Column width={4} />
				</Button>
			</Grid.Row>
		</div>
	)
}
