
import React from 'react';

const Text = (props) => {

    let inputStyles = {...STYLES.input};
    let labelStyles = {...STYLES.label};
    let containerStyles = {...STYLES.container}

    let color = props.color ? props.color : 'black';
    if (props.color) {
        inputStyles.borderColor = color;
        inputStyles.color = color;
        labelStyles.color = color;
    }

    inputStyles = {...inputStyles, ...(props.stylesinput ? props.stylesinput : {})};
    labelStyles = {...labelStyles, ...(props.styleslabel ? props.styleslabel : {})};
    containerStyles = {...containerStyles, ...(props.stylescontainer ? props.stylescontainer : {})};
    
    return (
        <div style={containerStyles}>
            {props.title && <label style={labelStyles}>{props.title}</label>}
            <input
                type='text'
                style={inputStyles}
                {...props}
            />
        </div>
    )
}

export default Text;

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
        width: '100%',
    },
    input: {
        backgroundColor: 'transparent',
        height: '30px',
        border: '2px solid #C4C7C5',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontSize: '16px',
        borderRadius: '4px',
    },
    label: {
        marginBottom: '2px',
        fontSize: '16px',
        fontWeight: 'bold'
    }
}