import React from 'react';
import Panel from './panel';

//buttonText=Button Text
//buttonOnClick= On Click Function
//buttonStyles= Button Styles

const Section = (props) => {
        return(
            <div style={STYLES.outerContainer}>
                <div style={STYLES.title}>
                    {props.title}
                </div>
                <Panel 
                    style={{...STYLES.container, ...(props.style ? props.style : {})}}
                    styleHover={props.styleHover ? props.styleHover : {}}
                    tagName='div'
                    className={props.className}
                    props={{
                        onClick: props.onClick
                    }}
                >
                    {props.children}
                </Panel>
            </div>
        )
}

export default Section;
const STYLES = {
    outerContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
    },
    container: {
        background: 'white',
        padding: '20px',
        boxShadow: '1px 1px 5px 0px #e7e4e9',
        marginTop: '15px'
    },
    title: {
        fontSize: '22px',
        lineHeight: '30px',
        fontWeight: '600',
    }
}
