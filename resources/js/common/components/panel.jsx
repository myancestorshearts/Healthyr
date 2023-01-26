import React from 'react';
import StyledComponent from './styled-component';

//buttonText=Button Text
//buttonOnClick= On Click Function
//buttonStyles= Button Styles

const Panel = (props) => {
        return(
            <StyledComponent 
                style={{...STYLES.container, ...(props.style ? props.style : {})}}
                styleHover={props.styleHover ? props.styleHover : {}}
                tagName='div'
                className={props.className}
                props={{
                    onClick: props.onClick
                }}
            >
                {props.children}
            </StyledComponent>
        )
}

export default Panel;
const STYLES = {
    container: {
        background: 'white',
        padding: '20px',
        boxShadow: '1px 1px 5px 0px #e7e4e9',

    },
}
