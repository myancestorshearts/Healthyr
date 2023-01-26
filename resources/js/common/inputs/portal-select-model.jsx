
import Select from '../components/select';

import React from 'react';

import Functions from '../functions';

const UNDEFINED = 'undefined';

export default class SelectModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {

        let value = e.target.value;
        let model = this.props.models.find(x => value == x.id)

        this.props.onChange(model);
    
    }

    render() {

        let value = (!Functions.isEmpty(this.props.value)) ? this.props.value.id : UNDEFINED;


        let options = this.props.models.map(x => ({
            label: x.name,
            value: x.id
        }))

        if (value == UNDEFINED) {
            options.unshift({
                label: 'Select Option',
                value: UNDEFINED
            })
        }

        return <Select 
            autoFocus={this.props.autoFocus}
            title={this.props.title}
            value={value}
            options={options}
            onChange={this.handleChange}
            stylesselect={this.props.stylesselect}
            styleslabel={this.props.styleslabel}
            stylescontainer={this.props.stylescontainer}
            color={this.props.color}
        />;
    }

}
