import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class IconCheckbox extends React.Component {

	constructor(props)
	{
		super(props)

		this.state = {
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		if (this.props.onChange) this.props.onChange();
		this.forceUpdate()
	}

	render() {
		if (this.props.disabled) inputAttributes.disabled = this.props.disabled;
		let alternateColor = ((this.props.value == true) ? ((this.props.alternateColor) ? ((this.props.alternateColor == '#FFFFFF00') ? '#FFFFFFFF' : this.props.alternateColor) : '#FFFFFFFF') : (this.props.alternateColor) ? this.props.alternateColor :'#FFFFFF00')
		let stylesClasses = ((this.props.stylesClasses) ? this.props.stylesClasses : '')
		let buttonStyles = {
			'color': ((!this.props.value) ? this.props.color : this.props.activeColor),
			'backgroundColor': ((!this.props.value) ? this.props.backgroundColor : this.props.activeBackgroundColor),
    		'cursor': 'pointer',
		}
		let icon = (this.props.value) ? this.props.activeIcon : ((this.props.inactiveIcon) ? this.props.inactiveIcon : this.props.activeIcon);
		return (
		<span style={buttonStyles} onClick={this.handleChange}>
			<FontAwesomeIcon icon={icon} size={'1.8x'}/>
		</span>
		)
	}
}


