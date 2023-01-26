import React from 'react';

export default class Select extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render() {

        let selectStyles = {...STYLES.select};
        let labelStyles = {...STYLES.label};
        let containerStyles = {...STYLES.container}

        let color = this.props.color ? this.props.color : 'black';
        if (this.props.color) {
            selectStyles.borderColor = color;
            selectStyles.color = color;
            labelStyles.color = color;
        }

        selectStyles = {...selectStyles, ...(this.props.stylesselect ? this.props.stylesselect : {})};
        labelStyles = {...labelStyles, ...(this.props.styleslabel ? this.props.styleslabel : {})};
        containerStyles = {...containerStyles, ...(this.props.stylescontainer ? this.props.stylescontainer : {})};

        let options = this.props.options.map(x => <option key={x.value} value={x.value}>{x.label}</option>)
        
        return (
            <div style={containerStyles}>
                {this.props.title && <label style={labelStyles}>{this.props.title}</label>}
                <select
                    style={selectStyles}
                    {...this.props}
                >
                    {options}
                </select>
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
    select: {
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
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#130168'
    }
}