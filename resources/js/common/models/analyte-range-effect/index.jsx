import React from "react";
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import TextArea from '../../inputs/text-area'

export default class AnalyteRangeAffect extends React.Component {

    constructor(props){
        super(props);
       
    }
    render(){
        return(
            <div style={STYLES.inputbox}>
            <FlexContainer>
        
                <Input
                    title='Min'
                    value={this.props.model.min}
                />

                <Input
                    title='Max'
                    value={this.props.model.max}
                />
                </FlexContainer>

                <TextArea 
                 title='Affect'
                 value={this.props.affect}
                />
            </div>
        )
    }
}

const STYLES = {
    inputbox: {
        padding: '10px',
        margin: '10px'

    },
}