import React from "react";

export default class Option extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div style={STYLES.container}>
            <div style={STYLES.round}>
             <p style={STYLES.paragraph}>Accepting Marketing from Healthyr?</p>
             <div style={STYLES.option} >
                <input type="radio"  />
                <label htmlFor="radio" style={STYLES.radiobutton}>Yes</label>
                <input type="radio"  />
                <label htmlFor="radio" style={STYLES.radiobutton}>No</label>
             </div>
              
            </div>
          </div>
            
        )
    }
}

const STYLES = {
   paragraph: {
      color: '#12144A',
      fontSize: '18px'
   },
   radiobutton: {
      paddingRight: '30px',
      fontFamily: 'Montserrat',
      paddingLeft: '5px',
      color: '#12144A',
      fontSize: '18px'
   },
   round: {
    
   }


}