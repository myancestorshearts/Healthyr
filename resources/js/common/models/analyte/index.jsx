import React from 'react';
import Input from '../../inputs/field';
import TableSearch from '../../../common/portal/panel/table/search'
import AnalyteRange from '../analyte-range/index'
import SidePanel from '../../portal/panel/side-panel';
import TextArea from '../../inputs/text-area'
import FlexContainer from "../../components/flex-container";


export default class Analytes extends React.Component{
  constructor(props) {
    super(props);

    this.handleSelectModel = this.handleSelectModel.bind(this);
  }

  handleSelectModel(x) {
    SidePanel.pushStart('Analyte Range Details', 
    <AnalyteRange
     model={x}
    />,
     1
 )
  }
 render() {
    return(
        <div>
          <FlexContainer>
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
          </FlexContainer>
            <TextArea 
             title='Description'
             value={this.props.model.description}
             style={STYLES.area}
            />
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
   area: {
     border: 'none'
   }
}