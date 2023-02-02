import React from "react"

export default class Ellipses extends React.Component{



    render() {
        return (
            <div>
                <i className=" fa fa-ellipsis-v"></i>
            </div>
        )
    }
}

const STYLES = {
    dots:  {
        height: '20px',
        width:' 20px',
        backgroundColor: 'grey',
        borderRadius: '0%',
        display: 'inline-block',
        position: 'relative',
    },
   
    
}