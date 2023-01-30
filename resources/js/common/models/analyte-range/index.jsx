import React from "react";
import FlexContainer from "../../components/flex-container";
import InputSelect from "../../../common/inputs/select";
import Input from '../../inputs/field';
import TableSearch from '../../../common/portal/panel/table/search'
import Switch from "react-switch";
import SidePanel from '../../portal/panel/side-panel';
import AnalyteRangeEffect from '../analyte-range-effect/index'
import Brand from "../../brand"
import FlexExpander from "../../components/flex-expander";
import CommonBrand from '../../../common/brand'
import AddAnalyteRangeEffect from "../../portal/content/forms/add-analyte-range-effect";
import GraphComponent from '../../components/graph-component'




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
            genderOptions: GENDER_OPTIONS[0],
            checked: false
        }
        this.toggleClick = this.toggleClick.bind(this);
        this.handleSelectModel = this.handleSelectModel.bind(this)
        this.handleAdd = this.handleAdd.bind(this);

    }

    handleSelectModel(x) {
        console.log('here')
        SidePanel.pushStart('Analyte Range Affect Details', 
      
        < AnalyteRangeEffect
         model={x}
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

   toggleClick(checked) {
        this.setState({
           checked
        })
    }

    render() {
        return(
            <React.Fragment>

            <div style={STYLES.containerButton}>

                <InputSelect
                    options={GENDER_OPTIONS}
                    value={this.props.model.gender}
                    onChange={(e) => { 
                        this.props.model.gender = e.target.value;
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
               
                <button style={STYLES.buttonCreate} onClick={() => this}>
                        Save
                </button>
                </div> 
    
                <div style={STYLES.textarea}>
                <FlexContainer direction='row' gap='15px'>
               
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
                    title: 'Affect',
                    property: 'affect',
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
        justifyContent: 'flex-end'
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
		fontFamily: 'Poppins'
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
  