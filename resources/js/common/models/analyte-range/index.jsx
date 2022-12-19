
import React from "react";
import FlexContainer from "../../components/flex-container";
import InputSelectModel from "../../../common/inputs/select-model";
import InputText from '../../inputs/text';
import TableSearch from '../../../common/portal/panel/table/search'


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
            isToggle: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggle: !state.isToggle
        }))
    }

    render() {
        return (
        <React.Fragment>
            <FlexContainer>
                <InputSelectModel
                    models={GENDER_OPTIONS}
                    value={this.state.genderOptions}
                    onChange={(x) => this.setState({ genderOptions: x })}
                    stylesselect={STYLES.selectInput}
                    stylescontainer={STYLES.selectContainer} />
                
            </FlexContainer>
            <div style={STYLES.inputbox}>
                <FlexContainer>
                    <InputText
                        title='Age Min Months'
                        value={this.props.model.age_min_months}
                    />

                    <InputText
                        title='Age Max Months'
                        value={this.props.model.age_max_months}
                    />

                    <InputText
                        title='Report Min'
                        value={this.props.model.report_min}
                    />
                    <InputText
                        title='Low Min'
                        value={this.props.model.low_min}
                    />
                    <InputText
                        title='Healthy Min'
                        value={this.props.model.report_min}
                    />
                    <InputText
                        title='Healthy Max'
                        value={this.props.model.report_min}
                    />

                    <InputText
                        title='High Max'
                        value={this.props.model.report_min}
                    />
                     <InputText
                        title='Report Max'
                        value={this.props.model.report_min}
                    />
                    

                </FlexContainer>
                <TableSearch
                classkey='analyterangeaffect'
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
      height: '50px',
      fontSize: '20px',
      textAlign: 'center',
      border: 'none',
    },
    selectContainer: {
      backgroundColor: 'white',
      border: 'solid #f1f4f9',
      borderRadius: '20px',
      maxWidth: '100px',
      paddingRight: '20px',
    },
    inputbox: {
        padding: '10px'
    },
    sliderinput: {
        position: 'relative',
        display: 'inline-block',
        width: '50px',
        height: '25px'
      
    },
    slider: {
        position: 'absolute',
        cursor:' pointer',
        backgroundColor: '#ccc',
        //webkitTransition:' .4s',
        //transition: '.4s'
    }
    
  }
  