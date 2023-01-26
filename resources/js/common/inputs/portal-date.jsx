
import React from 'react';
import DatePicker from 'react-date-picker'
export default class DateInput extends React.Component {

    constructor(props)
    {
        super(props)
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e){
        this.props.handleChange(e);
    }
    render(){

        let inputStyles = {...STYLES.input};
        let labelStyles = {...STYLES.label};
        let containerStyles = {...STYLES.container}

        let color = this.props.color ? this.props.color : 'black';
        if (this.props.color) {
            inputStyles.borderColor = color;
            inputStyles.color = color;
            labelStyles.color = color;
        }
        inputStyles = {...inputStyles, ...(this.props.stylesinput ? this.props.stylesinput : {})};
        labelStyles = {...labelStyles, ...(this.props.styleslabel ? this.props.styleslabel : {})};
        containerStyles = {...containerStyles, ...(this.props.stylescontainer ? this.props.stylescontainer : {})};
        return (
            <div style={containerStyles}>
                {this.props.title && <label style={labelStyles}>{this.props.title}</label>}
                <div style={inputStyles}>
                    <DatePicker clearIcon={null} format={"MM/dd/y"} showLeadingZeros={true} onChange={this.handleKeyPress} value={this.props.value} style={inputStyles} disableCalendar={true} openCalendarOnFocus={false}/>
                </div>
            </div>
        )
    }
}

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