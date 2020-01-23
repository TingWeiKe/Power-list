import React from 'react'
import { Button } from 'semantic-ui-react'

export default function RefreshButton(props){
	return (
		<div onClick={props.onClick}  style={props.show?{'display':'block'}:{'display':'none'}} className='refresh_button'>
			<Button primary size='big'>重新整理</Button>
		</div>
	)
}
