import React from "react";



export default class ToggleButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isPregnant: false
        }
        this.togglebtn = this.togglebtn.bind(this)
    }

    togglebtn() {
        this.setState({isPregnant:!this.state.isPregnant})
    }

    render(){
        //const {isPregnant }= this.state;
        let options = this.state.isPregnant? "Pregnant" : "Not Pregnant"
        return(
            <div>
              <button onClick={this.togglebtn}>{options}</button>
            </div>
        )
    }
}

const STYLES = {
    too: {
        color: black
    },
    togglebutton: {
        width: '60px',
        height: '34px',
        position: 'relative',
    },
    inputStyles: {
        width: '0',
        height: '0'
    },
    togglebtn: {
     top:'0',
     left:'0',
     right: '0',
     bottom: '0',
     cursor:' pointer',
     transition: '0.6s',
     backgroundColor: 'blue'
    }

}