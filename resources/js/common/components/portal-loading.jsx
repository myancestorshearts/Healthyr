import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'


export default class Loading extends React.Component {

	constructor(props)
	{
		super(props)
		this.state = {
			loading: false
		}
	}



	render() {
	
		if (this.props.loading == true) return (
			<div style={{...STYLES.loadingSearchDiv, ...this.props.style ? this.props.style : {}}}>
				<img src={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/healthyr-Icon-transparency-.gif?v=1667951704'}/>
			</div>
		)
		return <React.Fragment>{this.props.children}</React.Fragment>
	}

}

const STYLES = {

	loadingSearchDiv: {
		width: "auto",
		display: "flex",
		height: "75px",
		minWidth: 1,
		justifyContent: 'center',
		overflow: 'auto'
	},

	loadingSearchIcon: {
		fontSize: "40px",
		color: "#16006d",
		top: "50%",
		margin: "auto"
	},
}