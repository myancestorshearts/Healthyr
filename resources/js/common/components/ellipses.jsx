import React from "react"
import Brand from "../brand"

export default class Ellipses extends React.Component{
    

    

    render() {
        return (
            <div 
            onClick={this.props.onClick} 
            style={STYLES.containerDot} 
            stylehover={STYLES.dotActive}
            >
                <i 
                className="fa fa-trash-o" 
                style={STYLES.dot}
                />
            </div>
        )
    }
}

const STYLES = {
   
   dot: {
    padding: '13px',
    backgroundColor: 'white',
    borderRadius: '20px',
    fontSize: '20px',
    cursor: 'pointer',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'grey',
   },
   dotActive:{
    backgroundColor: Brand.getSecondaryColor(),
    color: 'white',
  }
  
    
}