
import React from 'react';

const FlexContainer = (props) => {

    let containerStyles = { ...STYLES.container, ...(props.style ? props.style : {}) }

    // set custom gap
    if (props.gap) containerStyles.columnGap = props.gap;
    if (props.gap) containerStyles.rowGap = props.gap;
    if (props.columnGap) containerStyles.columnGap = props.columnGap;
    if (props.rowGap) containerStyles.rowGap = props.rowGap;
    if (props.direction) containerStyles.flexDirection = props.direction;

    if (props.center) {
        containerStyles.justifyContent = 'center';
        containerStyles.alignItems = 'center';
    }

    return (
        <div style={containerStyles}>
            {props.children}
        </div>
    )
}

const STYLES = {
    container: {
        display: 'flex',
        columnGap: '20px',
        rowGap: '20px',
        flexWrap: 'wrap',
        width: '100%'
    }
}

export default FlexContainer;