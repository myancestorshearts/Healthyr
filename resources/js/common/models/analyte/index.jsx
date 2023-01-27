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

export default class Analytes extends React.Component{
  constructor(props) {
    super(props);

    this.handleSelectModel = this.handleSelectModel.bind(this);
    this.handleAdd= this. handleAdd.bind(this);
  }

  handleSelectModel(x) {
    SidePanel.pushStart('Analyte Range Details', 
    <AnalyteRange
     model={x}
    />,
     1
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

 render() {
    return(

        <div>
              <div style={STYLES.containerButton}>
                <button style={STYLES.buttonCreate} onClick={() => this}>
                    Save
                </button>
              </div>
          <FlexContainer direction='column' gap='15px'>
            <Input
                title='Key'
                value={this.props.model.key}
              />
              <Input
                title='Name'
                value={this.props.model.name}
              />
              <Input
                title='Unit of Measure'
                value={this.props.model.unit_of_measure}
              />
              <TextArea 
              title='Description'
              value={this.props.model.description}
              style={STYLES.area}
              />
          </FlexContainer>

          <FlexExpander />
          <div style={STYLES.button}>
              <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
                  <i className="fa fa-plus" style={STYLES.createInputIcon}></i>
                  Add Range
              </button>
          </div>
                   
            <TableSearch
            classkey='analyterange'
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
      paddingLeft: '15px',
      paddingBottom: '15px',
      display: 'flex',
      justifyContent: 'flex-end'
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
  }
}