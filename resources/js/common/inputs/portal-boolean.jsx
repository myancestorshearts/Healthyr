import React from 'react';
import IconCheckbox from "./icon-checkbox";
import {faSquare} from '@fortawesome/free-regular-svg-icons'
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons'

export default class Boolean extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    if (this.props.onChange) this.props.onChange();
    this.forceUpdate()
  }

  render() {
    let containerStyles = {...STYLES.label, ...(this.props.stylescontainer ? this.props.stylescontainer : {})}
    let labelStyles = {...STYLES.span, ...(this.props.styleslabel ? this.props.styleslabel : {})};
    let descriptionStyles = {...STYLES.description, ...(this.props.stylesdescription ? this.props.stylesdescription : {})};
    return (
    <div style= {containerStyles}>
        <IconCheckbox
          onChange={this.handleChange} 
          value={this.props.value}
          activeIcon={faSquareCheck}
          inactiveIcon={faSquare}
        />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column', marginLeft: '20px'}}>
          {this.props.children}
          <div style={descriptionStyles}>{this.props.description}</div>
        </div>
    </div>
    );
  }
}
const STYLES = {
  label: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: '10px'
  },
  span: {
    fontSize: '14px',
    fontWeight: '700'
  },
  description: {
    fontSize: '13px',
  },
  checkBox: {
    marginRight: '20px',
  }
}