import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '../../components/box/box'
import { getFeaturedPlaylists, handleInitState } from '../../redux/box.redux'
import './today.scss'
import RefreshButton from '../../components/RefreshButton'

const Today = props => {
	const { box, language } = useSelector(state => ({ box: state.box, language: state.setting.language }));
	const url = 'https://api.kkbox.com/v1.1/featured-playlists?territory=' + language
	const dispatch = useDispatch();

	const handleRefresh = () => dispatch(getFeaturedPlaylists(url))

	useEffect(() => {
		dispatch(getFeaturedPlaylists(url))
	}, [])

	const { box_data, msg } = box || {}
	const isError = msg === '伺服器錯誤'

	return (
		<div className='container_header'>
			<Box msg={box.msg} data={box_data.data} title={box.title} bool={box.bool} title={box.title} />
			<RefreshButton onClick={handleRefresh} className='refresh_button' show={isError} />
		</div>
	)
}


export default Today
