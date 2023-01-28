import React from "react";
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import TextArea from '../../inputs/text-area'
import CommonBrand from '../../brand'
import ApiAdmin from '../../api/admin'
import toastr from "toastr";

export default class AnalyteRangeAffect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            min: this.props.model.min,
            max: this.props.model.max,
            effect: this.props.model.effect
          
        }
        this.handleSave= this.handleSave.bind(this)
    }
    handleSave() {
        
        this.loading = true;
        ApiAdmin.Generic.set({classkey:'analyterangeeffect', id: this.props.model.id, ...this.state}, success => {
            if(this.props.onSave) this.props.onSave(success.data.model);
        },
        failure => {
            toastr.error(failure.message)
        }
        )
        
     }
   
    render(){
        return(
           
             <FlexContainer direction="column" gap="15px">
        
                    <Input
                        onChange={e => this.setState({ min: e.target.value })}
                        title='Min'
                        value={this.state.min}
                    />

                    <Input
                        onChange={e => this.setState({ max: e.target.value })}
                        title='Max'
                        value={this.state.max}
                    />
                    
                    <TextArea 
                    onChange={x => this.setState({ effect: x})}
                    title='Effect'
                    style={STYLES.inputField}
                    value={this.state.effect}
                    />
                     <div>
                        <button style={STYLES.buttonCreate} onClick={() => this.handleSave()}>
                            Save
                        </button>
                    </div>
            </FlexContainer>
           
            
          
            
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