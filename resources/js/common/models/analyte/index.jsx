import React from 'react';
import Input from '../../inputs/field';
import TableSearch from '../../../common/portal/panel/table/search'
import AnalyteRange from '../analyte-range/index'
import SidePanel from '../../portal/panel/side-panel';
import TextArea from '../../inputs/text-area'
import FlexContainer from "../../components/flex-container";
import CommonBrand from '../../../common/brand'
import FlexExpander from '../../components/flex-expander';
import AddRange from '../../portal/content/forms/add-ranges'
import ApiAdmin from '../../api/admin'
import toastr from 'toastr';
import Ellipses from '../../components/ellipses';
import Duplicate from '../../components/duplicate';
import Spacer from '../../components/spacer';

export default class Analytes extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
       key: this.props.model.key,
       name: this.props.model.name,
       unit_of_measure: this.props.model.unit_of_measure,
       description: this.props.model.description,
       
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
    return(

          <div>
              
          <FlexContainer direction='column' gap='15px'>
            <FlexContainer gap="10px">
              <div style={STYLES.containerButton}>
                <Ellipses
                  onClick={this.handleDelete}
                />
                <Spacer/>
                <Duplicate
                 onClick={this.handleDuplicate}
                />
                <Spacer/>
                <button 
                style={STYLES.buttonCreate} 
                onClick={() => this.handleSave()}
                >
                  Save
                </button>
                </div>
            </FlexContainer>
                
                {/* <FontAwesomeIcon icon="fa fa-thin fa-clone" /> */}
               
               
            {/* </div> */}
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

        

            <FlexContainer gap="10px">
              <div style={STYLES.containerButton}>
                      <Ellipses
                        onClick={this.handleDelete}
                      />
                      <Spacer/>
                      <Duplicate
                      onClick={this.handleDuplicate}
                      />
                      <Spacer/>
                     
                    <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
                        <i className="fa fa-plus" style={STYLES.createInputIcon}></i>
                        Add Range
                    </button>
               </div>
            </FlexContainer>
          
         
                   
            <TableSearch
            classkey='analyterange'
            analyte_id={this.props.model.id}
            ref={(e) => (this.table = e)}
            properties={{
              key: {
                title: 'Gender',
                property: 'gender',
                type: 'TEXT',
                default: true,
              },
              name: {
                title: 'Pregnant',
                property: 'pregnant',
                type: 'BOOLEAN',
                boolTrue: 'Pregnant',
                boolFalse: 'Not Pregnant',
                default: true,
              },
              agemin: {
                title: 'Age Min Months',
                property: 'age_min_months',
                type: 'TEXT',
                default: true,
              },
             agemax: {
                title: 'Age Max Months',
                property: 'age_max_months',
                type: 'TEXT',
                default: true
              },
              reportmin: {
                title: 'Report Min',
                property: 'report_min',
                type: 'TEXT',
                default: true
              },
              reportmax: {
                title: 'Report Max',
                property: 'report_max',
                type: 'TEXT',
                default: true
              },
              lowmin: {
                title: 'Low Min',
                property: 'low_min',
                type: 'TEXT',
                default: true
              },
              higmax: {
                title: 'High Max',
                property: 'high_max',
                type: 'TEXT',
                default: true
              },
              healthymin: {
                title: 'Healthy Min',
                property: 'healthy_min',
                type: 'TEXT',
                default: true
              },
              healthymax: {
                title: 'Healthy Max',
                property: 'healthy_max',
                type: 'TEXT',
                default: true
              },

            }}
            onSelectModel={this.handleSelectModel}
          />
        </div>
    )
 }
}

const STYLES = {
   containerButton: {
      padding: '15px',
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
  
}