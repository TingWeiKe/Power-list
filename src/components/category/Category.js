import React, { Component } from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitState } from '../../redux/categoryBox.redux'

class Category extends Component {
	render() {
		const categoryData = this.props.data.category.category_data
		return (
			<Grid columns={4} doubling={true} stackable>
				{categoryData.hasOwnProperty('data') ? (
					categoryData.data.map(data => {
						return (
							<Grid.Column key={data.id}>
								<div className='feature_content'>
									<Link className='link' to={{ pathname: '/categoryBox/' + data.id, url: 'https://api.kkbox.com/v1.1/featured-playlist-categories/' + data.id + '?territory=' + this.props.language }}>
										<Segment className='feature_box'>
											<Image className='category_img' src={data.images[0].url} />
											<div className='title_box'>
												<h3 className='category_title'>{data.title}</h3>
											</div>
										</Segment>
									</Link>
								</div>
							</Grid.Column>
						)
					})
				) : null}
			</Grid>
		)
	}
}
const mapStateToProps = state => {
	return { data: state }
}
const actionCreate = { handleInitState }
Category = connect(mapStateToProps, actionCreate)(Category)

export default Category
