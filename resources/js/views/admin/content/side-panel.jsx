import React from 'react'
import Brand from '../../../common/brand'

export default class SidePanel extends React.Component {
  render() {
    return (
      <div style={STYLES.container}>
        <div style={STYLES.iconFilter}>
          <i className='fa fa-times' style={STYLES.icon}/>
          <span style={STYLES.spantitle}>Test Analysis</span>
        </div>
        <div>
          Comment
          <textarea
           style={STYLES.text}
          />
        </div>
         
        
      </div>
    )
  }
}
const STYLES = {
  container: {
    position: 'fixed',
    top: '0px',
    bottom: '0px',
    right: '0px',
    background: '#FFFFFF'
  },
  iconFilter: {
    padding: '15px',
    color: Brand.getActiveColor(),
    minWidth: '500px',
    border: 'none',
    borderBottom: '1px solid #20145e',
    boxShadow: 'none',
    fontSize: '18px'
  },
  spantitle: {
     padding: '15px',
     fontSize: '18px',
     fontFamily: 'poppins'
  },
  text: {
    border: '2px solid transparent',
    backgroundColor: Brand.getBackgroundColor(),
    color:'black',
    outline: 'none',
    borderRadius: '10px',
    margin: '10px',
    width: '200px',
    height: '100px',
    position: 'fixed'
  }
  
}
