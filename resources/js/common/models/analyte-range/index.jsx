
import React from "react";
import FlexContainer from "../../components/flex-container";
import InputSelectModel from "../../../common/inputs/select-model";
import InputText from '../../inputs/text';
import TableSearch from '../../../common/portal/panel/table/search'
import Button from "../../inputs/button";


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
            isPregnant: false
        }
        this.toggleClick = this.toggleClick.bind(this);
    }

   toggleClick() {
        this.setState({
            isPregnant: !this.state.isPregnant
        })
    }

    render() {
        let options = this.state.isPregnant? "Pregnant" : "Not Pregnant"
        return (
        <React.Fragment>
               <FlexContainer>
                <InputSelectModel
                    models={GENDER_OPTIONS}
                    value={this.state.genderOptions}
                    onChange={(x) => this.setState({ genderOptions: x })}
                    stylesselect={STYLES.selectInput}
                    stylescontainer={STYLES.selectContainer}
                 />
                
               
                <p>here</p>
                 <Button onClick={this.togglebtn} styleinput={STYLES.sliderinput} style={STYLES.slider}>{options}</Button>
              
            
               </FlexContainer>
            <div style={STYLES.inputbox}>
               
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
      background: 'white',
    },
    selectContainer: {
      
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
        //display: 'inline-block',
        width: '50px',
        height: '25px'
      
    },
    slider: {
        position: 'absolute',
        cursor:' pointer',
        background: '#ffffff',
        //webkitTransition:' .4s',
        //transition: '.4s'
    }
    
  }
  