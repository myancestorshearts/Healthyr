import React from "react";
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import TextArea from '../../inputs/text-area'
import CommonBrand from '../../brand'

export default class AnalyteRangeAffect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            min: this.props.model.min,
            max: this.props.model.max,
            affect: this.props.model.affect
          
        }
        //this.handleAdd = this.handleAdd.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
    }

   
    
   
    render(){
        return(
           
            <form onSubmit={this.handleSubmit} direction="column" gap='15px'>
             <FlexContainer direction="column" gap="15px">
        
                    <Input
                        title='Min'
                        value={this.props.model.min}
                    />

                    <Input
                        title='Max'
                        value={this.props.model.max}
                    />
                    
                    <TextArea 
                    title='Affect'
                    style={STYLES.inputField}
                    value={this.props.model.affect}
                    />
            </FlexContainer>
            <div>
                        <button style={STYLES.buttonCreate} onClick={() => this}>
                            Save
                        </button>
                    </div>
            </form>

          
            
      )
    }
}

const STYLES = {
    buttonCreate: {
        paddingRight: '10px',
        paddingLeft: '10px',
        height: '50px',
        backgroundColor: CommonBrand.getSecondaryColor(),
        border: 'none',
        borderRadius: '20px',
        boxShadow: 'rgb(180 204 222 / 20%) 5px 5px 10px',
        color: '#ffffff',
        fontWeight: 20,
        fontSize: '18px',
        fontFamily: 'Poppins',
        cursor: 'pointer'
    },
    inputField: {
        cursor: 'text'
    }
}