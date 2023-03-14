import React from "react";
import FlexContainer from "../../../../common/components/flex-container";
import FlexExpander from "../../../../common/components/flex-expander";
import InputText from '../../../../common/inputs/field'
import Option from '../../common/option';
import Button from '../../../../common/inputs/button'
import Title from '../../../../common/portal/title';

export default class Profile extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
         
        <div>
            <Title title='Personal Information'/>
       
            <div style={STYLES.boxinput}>
                
                <div style={STYLES.boxcont}>

                
                    <FlexContainer gap="50px">
                        <InputText 
                            title="First Name"
                            stylesinput={STYLES.input}
                            styleslabel={STYLES.label}
                        />
                        <InputText 
                            stylesinput={STYLES.input} 
                            styleslabel={STYLES.label}
                            title="Last Name"
                        />
                    </FlexContainer>

                    <FlexContainer gap="50px">
                        <InputText
                            title="Email"
                            styleslabel={STYLES.label}
                            stylesinput={STYLES.input} 
                        />
                        
                        <InputText
                            title="Biological Sex"
                            styleslabel={STYLES.label}
                            stylesinput={STYLES.input} 
                        />
                    </FlexContainer>
                    
                    <FlexContainer gap="50px">
                        <InputText 
                            title="Date of Birth"
                            styleslabel={STYLES.label}
                            stylesinput={STYLES.input} 
                        />
                        
                        <InputText 
                            title="Address"
                            styleslabel={STYLES.label}
                            stylesinput={STYLES.input} 
                        />
                    </FlexContainer>  
                    <Option />
                    <FlexContainer top='10px'>
                        <Button stylesbutton={STYLES.savebutton}>
                            Save Details
                        </Button>
                        <Button stylesbutton={STYLES.button}>
                            Cancel
                        </Button>
                    </FlexContainer>
                </div>
            </div>
        </div>
           
        )
    }
}

const STYLES = {
  boxinput: 
  {
    
    padding: '50px'

  },
  
  input: 
  {
    width: '341px',
    fontStyle: 'normal',
    fontSize: '18px',
    fontFamily: 'Assistant',
    background: '#F4F4F4',
    border: '0.2px solid #F4F4F4',
    borderRadius: '15px'
  },
  label: 
  {
        paddingBottom: '10px',
        paddingTop: '10px',
        color: '#12144A'
  },
  savebutton:
  {
    
    width: '191px',
    borderRadius: '30px',
    left: '320px',
    top: '685px',
    background: '#F25F77',
    border: 'none', 
    color: 'white'
  },
  button:
  {
    width: '191px',
    borderRadius: '30px',
    border: '1px solid #12144A'
  }

}