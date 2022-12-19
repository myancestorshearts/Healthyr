
import React from 'react';
import Functions from '../functions';

export default class TextInput extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            height: '200'
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            height: e.target.scrollHeight - 20
        })

        if (this.props.onChange) this.props.onChange(e.target.value);
    }

    render() {
        let id = Functions.getRandomId();
        let inputStyles = { ...STYLES.input, height: `${this.state.height}px` };
        let labelStyles = { ...STYLES.label };
        let containerStyles = { ...STYLES.container }

        let color = this.props.color ? this.props.color : 'black';
        if (this.props.color) {
            inputStyles.borderColor = color;
            inputStyles.color = color;
            labelStyles.color = color;
        }

        inputStyles = { ...inputStyles, ...(this.props.stylesinput ? this.props.stylesinput : {}) };
        labelStyles = { ...labelStyles, ...(this.props.styleslabel ? this.props.styleslabel : {}) };
        containerStyles = { ...containerStyles, ...(this.props.stylescontainer ? this.props.stylescontainer : {}) };

        let value = this.props.value ? this.props.value : '';


        return (
            <div style={containerStyles}>
                {this.props.title && <label htmlFor={id} style={labelStyles}>{this.props.title}</label>}
                <textarea
                    id={id}
                    style={inputStyles}
                    onChange={this.handleChange}
                    value={value}
                />
            </div>
        )
    }
}


const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px'
    },
    input: {
        backgroundColor: 'transparent',
        height: '100px',
        borderRadius: '5px',
        border: '2px solid',
        padding: '10px',
        fontSize: '16px',
        resize: 'none'
    },
    label: {
        marginBottom: '2px',
        fontSize: '16px',
        fontWeight: 'bold'
    }
}