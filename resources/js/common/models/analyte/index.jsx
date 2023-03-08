import React from 'react';
import Input from '../../inputs/field';
import TableSearch from '../../../common/portal/panel/table/search'
import AnalyteRange from '../analyte-range/index'
import SidePanel from '../../portal/panel/side-panel';
import TextArea from '../../inputs/text-area'
import FlexContainer from "../../components/flex-container";
import CommonBrand from '../../../common/brand'
import AddRange from '../../portal/content/forms/add-ranges'
import ApiAdmin from '../../api/admin'
import toastr from 'toastr';
import InputSelect from '../../../common/inputs/select'
import { CONFIRM } from '../../components/modal/index';


const TYPE_OPTIONS= [
  {
    label: 'Range',
    value: 'RANGE',
  },
  {
    label: 'Binary',
    value: 'BINARY',
  },
]

export default class Analytes extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
       key: this.props.model.key,
       name: this.props.model.name,
       type: TYPE_OPTIONS[0],
       unit_of_measure: this.props.model.unit_of_measure,
       description: this.props.model.description,
       binary_false_effect: this.props.model.binary_false_effect,
       binary_true_effect: this.props.model.binary_true_effect
    }

    this.handleSelectModel = this.handleSelectModel.bind(this);
    this.handleAdd= this. handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDuplicate = this.handleDuplicate.bind(this)
  }

    handleSelectModel(x) {
      SidePanel.pushStart('Analyte Range Details', 
      <AnalyteRange
      model={x}
      onSave={() => {
        SidePanel.pop();
        if (this.table) this.table.handleSearch();
      }}
      />,
      1
    )
    }

  handleDelete() {
     
    ApiAdmin.Generic.delete({
      classkey: 'analyte', id: this.props.model.id
    }, () => { 
      toastr.success('Analyte Successfully Deleted')
      if(this.props.onDelete) this.props.onDelete()
    }, failure => {
      toastr.error(failure.message);
    }
    )
}

  handleDuplicate() {
    
    let duplicate = {...this.props.model}
    delete duplicate.id

    ApiAdmin.Generic.add({
      classkey: 'analyte', ...duplicate
    }, () => {
      toastr.success('Analyte Successfully Duplicated')
      if(this.props.onDelete) this.props.onDelete()
    }, failure => {
      toastr.error(failure.message);
    }

    )
  }


  
  handleAdd() {
    SidePanel.pushStart( 'Add Analyte',
     <AddRange 
       analyte = {this.props.model}
       onAdd={() => {
         SidePanel.pop();
         if (this.table) this.table.handleSearch();
       }}
     />

    )
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
  console.log('here', this.state)
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
              <InputSelect
                options={TYPE_OPTIONS}
                value={this.state.type}
                onChange={(e) => { 
                    this.state.type = e.target.value;
                    this.forceUpdate();
                }}
                stylesselect={STYLES.selectInput}
                stylescontainer={STYLES.selectContainer}
              />
              <TextArea 
              onChange={x => this.setState({ description: x})}
              title='Description'
              value={this.state.description}
              style={STYLES.area}
              />

              <Input
                onChange={e => this.setState({ binary_false_effect: e.target.value })}
                title='Binary False Effect'
                value={this.state.binary_false_effect}
              />  

              <Input
                onChange={e => this.setState({ binary_true_effect: e.target.value })}
                title='Binary True Effect'
                value={this.state.binary_true_effect}
              /> 
          </FlexContainer>

        
        

         {this.state.type == 'RANGE' ?   
         <div>

        
          <div style={STYLES.containerButton}>
                <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
                    <i className="fa fa-plus" style={STYLES.createInputIcon}></i>
                    Add Range
                </button>
          </div>
        
        
            <TableSearch
            classkey='analyterange'
            analyte_id={this.props.model.id}
            ref={(e) => (this.table = e)}
            properties={{
              key: {
                sortable: true,
                title: 'Gender',
                property: 'gender',
                type: 'TEXT',
                default: true,
              },
              name: {
                sortable: true,
                sortable: true,
                title: 'Pregnant',
                property: 'pregnant',
                type: 'BOOLEAN',
                boolTrue: 'Pregnant',
                boolFalse: 'Not Pregnant',
                default: true,
              },
              agemin: {
                sortable: true,
                title: 'Age Min Months',
                property: 'age_min_months',
                type: 'TEXT',
                default: true,
              },
             agemax: {
                sortable: true,
                title: 'Age Max Months',
                property: 'age_max_months',
                type: 'TEXT',
                default: true
              },
              reportmin: {
                sortable: true,
                title: 'Report Min',
                property: 'report_min',
                type: 'TEXT',
                default: true
              },
              reportmax: {
                sortable: true,
                title: 'Report Max',
                property: 'report_max',
                type: 'TEXT',
                default: true
              },
              lowmin: {
                sortable: true,
                title: 'Low Min',
                property: 'low_min',
                type: 'TEXT',
                default: true
              },
              higmax: {
                sortable: true,
                title: 'High Max',
                property: 'high_max',
                type: 'TEXT',
                default: true
              },
              healthymin: {
                sortable: true,
                title: 'Healthy Min',
                property: 'healthy_min',
                type: 'TEXT',
                default: true
              },
              healthymax: {
                sortable: true,
                title: 'Healthy Max',
                property: 'healthy_max',
                type: 'TEXT',
                default: true
              },

            }}
            onSelectModel={this.handleSelectModel}
          />
           </div> 
          : null } 
         
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
},
selectInput: {
  height: '40px',
  fontSize: '20px',
  textAlign: 'center',
  border: 'none',
  
},
selectContainer: {
  border: 'solid #f1f4f9',
  borderRadius: '20px',
  maxWidth: '100px',
  padding: '15px',
},
  
}