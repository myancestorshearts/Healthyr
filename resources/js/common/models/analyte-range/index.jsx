
import React from "react";
import FlexContainer from "../../components/flex-container";
import InputSelectModel from "../../../common/inputs/select-model";
import Input from '../../inputs/field';
import TableSearch from '../../../common/portal/panel/table/search'
import Switch from "react-switch";
import SidePanel from '../../portal/panel/side-panel';
import AnalyteRangeAffect from "../analyte-range-effect";
import Brand from "../../brand"




const GENDER_OPTIONS = [
    {
        name: 'Female',
        id: 'FEMALE',
    },
    {
        name: 'Male',
        id: 'MALE',
    },
    {
        name: 'Prefer not say',
        id: 'PREFER NOT SAY'
    }
  ]


export default class AnalyteRange extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            genderOptions: GENDER_OPTIONS[0],
            checked: false
        }
        this.toggleClick = this.toggleClick.bind(this);
        this.handleSelectModel = this.handleSelectModel.bind(this)
    }

    handleSelectModel(x) {
        SidePanel.pushStart('Analyte Range Affect Details', 
        <AnalyteRangeAffect
         model={x}
        />,
         2
     )
    }

   toggleClick(checked) {
        this.setState({
           checked
        })
    }

    render() {
        return(
            <React.Fragment>
            <FlexContainer>
                <div>
                <InputSelectModel
                    models={GENDER_OPTIONS}
                    value={this.state.genderOptions}
                    onChange={(x) => this.setState({ genderOptions: x })}
                    stylesselect={STYLES.selectInput}
                    stylescontainer={STYLES.selectContainer}
                />
                

                </div>
               
                <div style={STYLES.styleswitch}>
                <Switch onChange={this.toggleClick} checked={this.state.checked}/>
                </div>
                


            </FlexContainer>
                
                <div style={STYLES.inputbox}>
                    <FlexContainer>
                
                        <Input
                            title='Age Min Months'
                            value={this.props.model.age_min_months}
                        />

                        <Input
                            title='Age Max Months'
                            value={this.props.model.age_max_months}
                        
                        />

                        <Input
                            title='Report Min'
                            value={this.props.model.report_min}
                        />
                        <Input
                            title='Low Min'
                            value={this.props.model.low_min}
                        />
                        <Input
                            title='Healthy Min'
                            value={this.props.model.report_min}
                        />
                        <Input
                            title='Healthy Max'
                            value={this.props.model.report_min}
                        />

                        <Input
                            title='High Max'
                            value={this.props.model.report_min}
                        />
                        <Input
                            title='Report Max'
                            value={this.props.model.report_min}
                        />
                        
                    </FlexContainer>
            
                    
                    <TableSearch
                        classkey='analyterangeeffect'
                        ref={(e) => (this.table = e)}
                        properties={{
                        analyteId: {
                            title: 'Analyte Id',
                            property: 'id',
                            type: 'TEXT',
                            default: true,
                        },
                        min: {
                            title: 'Min',
                            property: 'min',
                            type: 'TEXT',
                            default: true,
                        },
                        max: {
                            title: 'Max',
                            property: 'max',
                            type: 'TEXT',
                            default: true,
                        },
                        affect: {
                            title: 'Affect',
                            property: 'affect',
                            type: 'TEXT',
                            default: true
                        },
                        }}
                        onSelectModel={this.handleSelectModel}
                    />
                
                </div>
            </React.Fragment>
        )
    }
}

const STYLES = {
    
    selectInput: {
      height: '60px',
      fontSize: '20px',
      textAlign: 'center',
      border: 'none',
      
    },
    selectContainer: {
      
      border: 'solid #f1f4f9',
      borderRadius: '20px',
      maxWidth: '100px',
      margin:'10px',
      paddingRight: '20px',
    },
    inputbox: {
        padding: '10px',
        margin: '10px',
        color: Brand.getActiveColor()

    },
    styleswitch: {
        padding: '10px',
        margin: '10px',
        color: Brand.getActiveColor()
    }
    
    
  }
  