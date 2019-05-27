import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Image, Grid, Loader } from 'semantic-ui-react'
import './box.scss'
import { icon } from './box.img'
import { modifyUpdatedAt } from '../../utils/kkboxAPI'

const Box = props => {
	const data = props.data
	const bool = props.bool
	return (
		<div>
			<h1>{props.title}</h1>
			<Loader content='載入中...' className='loader' active={bool} inline='centered' size='huge' disabled />
			<div className='box_container'>
				{data ? (
					data.map(data => {
						return (
							<div key={data.id} className='playlist'>
								<Link className='link' to={{ pathname: '/playlist/' + data.id, search: props.location.search }} id={data.id}>
									<Image style={{ width: ' 100%' }} centered={true} className='img' src={data.images[0].url} />
									<Image className='play_icon' src={icon} bordered={true} />
								</Link>
								<div style={{ cursor: 'default' }}>
									<div className='title'>
										<a className='link' href={'/playlist/' + data.id}>
											<h3>{data.title}</h3>
										</a>
									</div>
									<div className='description'>
										<p>{data.description}</p>
									</div>
									<div className='text'>
										<a className='link' href={data.owner.url}>
											<p>作者：{data.owner.name}</p>
										</a>
										<p>更新：{modifyUpdatedAt(data.updated_at)}</p>
									</div>
								</div>
							</div>
						)
					})
				) : null}
			</div>
		</div>
	)
}

export default withRouter(Box)
