import React, { Component } from 'react'
import { Grid, Image, Loader, Input, Form } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { search_icon } from '../../component/icon'
import { search_Data, getSearchNext, initSearchData } from '../../redux/search.redux'
import SmallBox from '../../component/smallBox/SmallBox'
import './search.scss'

class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			bool: false,
			title: '',
		}
	}

	handleSearch(value) {
		if (value) {
			this.props.initSearchData()
			this.setState({ bool: true, title: '' })
			this.props.search_Data(value, () => {
				this.setState({ bool: false, title: '“' + value + '“' + '：的搜尋結果' })
			})
		}
	}

	handleNext() {
		this.props.getSearchNext(this.props.search.data.paging.next)
	}
	render() {
		const searchData = this.props.search.data
		return (
			<div className='container_header'>
				<h1>搜尋</h1>

				<Form onSubmit={() => this.handleSearch(this.state.value)}>
					<Input placeholder='搜尋歌單...' onChange={(e, { value }) => this.setState({ value: value })} />
					<Image onClick={() => this.handleSearch(this.state.value)} className='search_icon' src={search_icon} />
					<Loader content='搜尋中...' className='loader' active={this.state.bool} inline='centered' size='huge' disabled />
					<h1 style={{ marginBottom: '40px' }}>{this.state.title}</h1>
				</Form>

				{searchData.hasOwnProperty('playlists') ? (
					<div>
						<Grid columns={4} doubling={true} stackable>
							{searchData.playlists.data.map((data) => {
								return <SmallBox key={data.id} id={data.id} src={data.images[0].url} title={data.title} />
							})}
							{!searchData.playlists.data.length > 0 ? <h2>搜尋不到歌單</h2> : null}
						</Grid>
						<InfiniteScroll pageStart={0} loadMore={() => this.handleNext()} hasMore={true} loader={<Loader key='loader' active={!!searchData.paging.next} content='載入中...' inline={'centered'} size='large' />} />
					</div>
				) : null}

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { search: state.search }
}
const actionCreate = { search_Data, getSearchNext, initSearchData }
Search = connect(mapStateToProps, actionCreate)(Search)

export default withRouter(Search)
