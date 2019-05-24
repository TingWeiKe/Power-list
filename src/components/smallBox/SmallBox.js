import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image, Segment } from 'semantic-ui-react'

export default function SmallBox(props){
	return (
		<Grid.Column key={props.id}>
			<div className='feature_content'>
				<Link className='link' to={'/playlist/' + props.id} id={props.id}>
					<Segment className='feature_box'>
						<Image className='category_img' src={props.src} />
						<div className='title_box'>
							<h3 className='category_title'>{props.title}</h3>
						</div>
					</Segment>
				</Link>
			</div>
		</Grid.Column>
	)
}
