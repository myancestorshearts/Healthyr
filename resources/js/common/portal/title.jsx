import React from 'react';
import CommonBrand from '../brand';


const Title = (props) => {
    return (
        <div style={STYLES.title}>{props.title}</div>
    )
}

export default Title;

const STYLES = {
    title: {
        width: '100%',
        color: CommonBrand.getSecondaryColor(),
        fontSize: '50px'
    }
} 