
import React from 'react';
import StyledComponent from '../components/styled-component';

export default class Button extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        let buttonStyles = {...STYLES.button};
        let buttonStylesHover = {};

        let color = this.props.color ? this.props.color : 'black';
        if (this.props.color) {
            buttonStyles.borderColor = color;
            buttonStyles.backgroundColor = (this.props.invert) ? color : 'transparent'
            buttonStyles.color = (this.props.invert) ? 'white' : color;
            buttonStylesHover.color = (this.props.invert) ? color : (color == 'white' ? 'black' : 'white'),
            buttonStylesHover.backgroundColor = (this.props.invert) ? 'transparent' : color;
        }

        buttonStyles = {...buttonStyles, ...(this.props.stylesbutton ? this.props.stylesbutton : {})};
        buttonStylesHover = {...buttonStylesHover, ...(this.props.stylesbuttonhover ? this.props.stylesbuttonhover : {})}
        let tagName = this.props.tagName ? this.props.tagName : 'button'
        return (
            <StyledComponent 
                ref={e => this.styledComponent = e}
                tagName={tagName}
                props={this.props.props}
                style={{...buttonStyles, ...(tagName == 'button' ? {width: '100%'} : {})}}
                styleHover={buttonStylesHover}
                className={this.props.className}>
                {this.props.children}
            </StyledComponent>
        )
    }
}

const STYLES = {
    button: {
        backgroundColor: 'transparent',
        border: '2px solid',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontSize: '20px',
        marginTop: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Open Sans',
        whiteSpace: 'nowrap'
    }
}