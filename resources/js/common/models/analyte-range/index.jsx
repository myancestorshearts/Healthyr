import React from "react";
import FlexContainer from "../../components/flex-container";
import InputSelect from "../../../common/inputs/select";
import Input from '../../inputs/field';
import TableSearch from '../../../common/portal/panel/table/search'
import Switch from "react-switch";
import SidePanel from '../../portal/panel/side-panel';
import AnalyteRangeEffect from '../analyte-range-effect/index'
import FlexExpander from "../../components/flex-expander";
import CommonBrand from '../../../common/brand'
import AddAnalyteRangeEffect from "../../portal/content/forms/add-analyte-range-effect";
import GraphComponent from '../../components/graph-component'

import ApiAdmin from '../../api/admin'

const GENDER_OPTIONS = [
    {
        label: 'Female',
        value: 'F',
    },
    {
        label: 'Male',
        value: 'M',
    },
    {
        label: 'Prefer not say',
        value: 'O'
    }
  ]


export default class AnalyteRange extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            gender: this.props.model.gender,
            genderOptions: GENDER_OPTIONS[0],
            checked: false,
            age_min_months: this.props.model.age_min_months,
            age_max_months: this.props.model.age_max_months,
            report_min: this.props.model.report_min,
            low_min: this.props.model.low_min,
            healthy_min: this.props.model.healthy_min,
            healthy_max: this.props.model.healthy_max,
            high_max: this.props.model.high_max,
            report_max: this.props.model.report_max,
            test_value: 0
        }
        this.toggleClick = this.toggleClick.bind(this);
        this.handleSelectModel = this.handleSelectModel.bind(this)
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this)


    }

    handleSelectModel(x) {
      
        SidePanel.pushStart('Analyte Range Affect Details', 
      
        < AnalyteRangeEffect
         model={x}
         onSave={() => {
            SidePanel.pop();
            if (this.table) this.table.handleSearch();
          }}
        />,
         2
     )
    }

    handleAdd() {
        SidePanel.pushStart( 'Add Analyte Range Details',
         <AddAnalyteRangeEffect
           analyteRange = {this.props.model}
           onAdd={() => {
             SidePanel.pop();
             if (this.table) this.table.handleSearch();
           }}
         />
   
        )
     }

     handleSave() {
        
        this.loading = true;
        ApiAdmin.Generic.set({classkey:'analyterange', id: this.props.model.id, ...this.state}, success => {
            if(this.props.onSave) this.props.onSave(success.data.model);
        },
        failure => {
            toastr.error(failure.message)
        }
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

            <div style={STYLES.containerButton}>
                    <FlexContainer direction='row' gap='15px'>
                         <Input
                            onChange={e => this.setState({ test_value: e.target.value })}
                            title='Test Value'
                            value={this.state.test_value}
                        />
                        <GraphComponent
                            result={{
                                report_min: this.state.report_min,
                                low_min: this.state.low_min,
                                healthy_min: this.state.healthy_min,
                                healthy_max: this.state.healthy_max,
                                high_max: this.state.high_max,
                                report_max: this.state.high_max,
                                result: this.state.test_value,
                                unit_of_measure: 'Units'
                            }}
                        />
                    </FlexContainer>

                    <FlexContainer direction='row' gap='15px' marginTop='50px'>
                    <InputSelect
                        options={GENDER_OPTIONS}
                        value={this.state.gender}
                        onChange={(e) => { 
                            this.state.gender = e.target.value;
                            this.forceUpdate();
                        }}
                        stylesselect={STYLES.selectInput}
                        stylescontainer={STYLES.selectContainer}
                    />

                    <div style={STYLES.styleswitch}>
                    <Switch 
                    onChange={this.toggleClick} 
                    checked={this.state.checked}
                    />
                    </div>
                    <FlexExpander/>
                   
                    <button style={STYLES.buttonCreate} onClick={() => this.handleSave()}>
                            Save
                    </button>
                    </FlexContainer>
                </div> 
    
                <div style={STYLES.textarea}>
                <FlexContainer direction='row' gap='15px'>

                <Input
                    onChange={e => this.setState({ age_min_months: e.target.value })}
                    title='Age Min Months'
                    value={this.state.age_min_months}
                />

                <Input
                    onChange={e => this.setState({ age_max_months: e.target.value })}
                    title='Age Max Months'
                    value={this.state.age_max_months}
                
                />

                <Input                    
                    onChange={e => this.setState({ report_min: e.target.value })}
                    title='Report Min'
                    value={this.state.report_min}
                />
                <Input
                    onChange={e => this.setState({ low_min: e.target.value })}
                    title='Low Min'
                    value={this.state.low_min}
                />
                <Input
                    title='Healthy Min'
                    value={this.state.healthy_min}
                    onChange={e => this.setState({ healthy_min: e.target.value })}

                />
                <Input
                    title='Healthy Max'
                    value={this.state.healthy_max}
                    onChange={e => this.setState({ healthy_max: e.target.value })}
                />

                <Input
                    title='High Max'
                    value={this.state.high_max}
                    onChange={e => this.setState({ high_max: e.target.value })}

                />
                <Input
                    title='Report Max'
                    value={this.state.report_max}
                    onChange={e => this.setState({ report_max: e.target.value })}

                />
                
                </FlexContainer>
                </div>
               
                        
           
            <FlexExpander />
                <div style={STYLES.button}>
                    <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
                        <i className="fa fa-plus" style={STYLES.createInputIcon}></i>
                        Add Affect
                    </button>
                </div>
                   
            <TableSearch
                classkey='analyterangeeffect'
                analyte_range_id={this.props.model.id}
                ref={(e) => (this.table = e)}
                properties={{
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
                    title: 'Effect',
                    property: 'effect',
                    type: 'TEXT',
                    default: true
                },
                }}
                onSelectModel={this.handleSelectModel}
            />
        
               
        </React.Fragment>
        )
    }
}

const STYLES = {

    containerButton: {
        padding: '15px',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
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
        maxWidth: '200px',
        padding: '15px',
      },
      inputbox: {
          padding: '10px',
          margin: '10px',
          color: CommonBrand.getActiveColor()
  
      },
      styleswitch: {
         padding: '15px',
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
  