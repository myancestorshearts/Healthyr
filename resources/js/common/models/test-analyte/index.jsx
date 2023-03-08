import React from 'react';
import Input from '../../inputs/field';
import Analyte from '../analyte/index'
import SidePanel from '../../portal/panel/side-panel';
import TextArea from '../../inputs/text-area'
import FlexContainer from "../../components/flex-container";
import CommonBrand from '../../../common/brand'
import AddRange from '../../portal/content/forms/add-ranges'
import ApiAdmin from '../../api/admin'
import toastr from 'toastr';


export default class Analytes extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
       key: this.props.model.key,
       name: this.props.model.name,
       unit_of_measure: this.props.model.unit_of_measure,
       description: this.props.model.description,
       
    }

   
  }

  
 handleSave() {
        
  this.loading = true;
  ApiAdmin.Generic.set({classkey:'analyte', id: this.props.model.id, ...this.state}, success => {
      if(this.props.onSave) this.props.onSave(success.data.model);
  },
  failure => {
      toastr.error(failure.message)
  }
  )
  
}

 render() {
    return(

          <div style={STYLES.textarea}>
              
          <FlexContainer direction='column' gap='15px'>
            <FlexContainer style={STYLES.containerButton}>
                <button 
                style={STYLES.buttonCreate} 
                onClick={() => this.handleSave()}
                >
                  Save
                </button>
             
            </FlexContainer>
            
           
            <Input
                onChange={e => this.setState({ key: e.target.value })}
                title='Key'
                value={this.state.key}
              />
              <Input
                onChange={e => this.setState({ name: e.target.value })}
                title='Name'
                value={this.state.name}
              />
              <Input
                onChange={e => this.setState({ unit_of_measure: e.target.value })}
                title='Unit of Measure'
                value={this.state.unit_of_measure}
              />
              <TextArea 
              onChange={x => this.setState({ description: x})}
              title='Description'
              value={this.state.description}
              style={STYLES.area}
              />
          </FlexContainer>
        </div>
    )
 }
}

const STYLES = {
   containerButton: {
      paddingTop: '15px',
      paddingBottom: '15px',
      display: 'flex',
      justifyContent: 'flex-end',
      flex: 1
   },
   area: {
     border: 'none'
   },
   buttonCreate: {
		paddingRight: '20px',
    paddingLeft: '20px',
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
	createInputIcon: {
		paddingRight: '10px'
	},
  button: {
      marginTop: '15px',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'flex-end'
  },
  textarea: {
    padding: '20px',
}
  
}