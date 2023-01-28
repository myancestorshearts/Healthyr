import React from 'react';
import Input from "../../../inputs/field"
import FlexContainer from '../../../components/flex-container';
import TextArea from '../../../inputs/text-area'
import CommonBrand from '../../../brand'
import toastr from 'toastr';
import ApiAdmin from '../../../api/admin';
import InputSelectModel from '../../../inputs/select-model'
import Switch from "react-switch";
import FlexExpander from '../../../components/flex-expander';

const GENDER_OPTIONS = [
    {
        name: 'Female',
        id: 'F',
    },
    {
        name: 'Male',
        id: 'M',
    },
    {
        name: 'Prefer not say',
        id: 'O'
    }
  ]

export default class AddAnalyteRange extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                analyte_id: props.analyte.id,
                gender: GENDER_OPTIONS[0],
                pregnant: false,
                age_min_months: '',
                age_max_months: '' ,
                report_min: '',
                low_min: '',
                healthy_min: '',
                healthy_max: '',
                high_max:'',
                report_max: '',

            }
            this.handleAdd = this.handleAdd.bind(this)
            this.toggleClick = this.toggleClick.bind(this);
        }

        handleAdd() {
        
            this.loading = true;
            ApiAdmin.Generic.add({classkey:'analyterange', ...this.state, gender: this.state.gender.id}, success => {
                if(this.props.onAdd) this.props.onAdd(success.data.model);
            },
            failure => {
                toastr.error(failure.message)
            }
            )
            
         }

        toggleClick(checked) {
            this.setState({
               pregnant: !this.state.pregnant
            })
        }

        render() {
            return(

                <React.Fragment>

                        <InputSelectModel
                            models={GENDER_OPTIONS}
                            value={this.state.gender}
                            onChange={(e) => { 
                                this.state.gender = e;
                                this.forceUpdate();
                            }}
                            stylesselect={STYLES.selectInput}
                            stylescontainer={STYLES.selectContainer} />

                        <div style={STYLES.styleswitch}>
                            <Switch onChange={this.toggleClick} checked={this.state.pregnant} />
                        </div>

                        <Input
                            autoFocus={true}
                            title='Age Min Months'
                            onChange={e => this.setState({ age_min_months: e.target.value })}
                            value={this.state.age_min_months} />

                        <Input
                            autoFocus={true}
                            title='Age Max Months'
                            onChange={e => this.setState({ age_max_months: e.target.value})}
                            value={this.state.age_max_months} />
                        <Input
                            autoFocus={true}
                            title='Report Min'
                            onChange={e => this.setState({ report_min: e.target.value })}
                            value={this.state.report_min} />
                        <Input
                            autoFocus={true}
                            title='Report Max'
                            onChange={e => this.setState({ report_max: e.target.value})}
                            value={this.state.report_max} />
                        <Input
                            autoFocus={true}
                            title='Low Min'
                            onChange={e => this.setState({ low_min: e.target.value})}
                            value={this.state.low_min} />
                        <Input
                            autoFocus={true}
                            title='High Max'
                            onChange={e => this.setState({ high_max: e.target.value})}
                            value={this.state.high_max} />
                        <Input
                            autoFocus={true}
                            title='Healthy Min'
                            onChange={e => this.setState({ healthy_min: e.target.value})}
                            value={this.state.healthy_min} />
                        <Input
                            autoFocus={true}
                            title='Healthy Max'
                            onChange={e => this.setState({ healthy_max: e.target.value})}
                            value={this.state.healthy_max} />

                    
                    
                    <div>
                        <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
                            Add
                        </button>
                    </div>
        
            </React.Fragment>
               
            )
        }
}

const STYLES = {
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
        paddingRight: '15px',
      },
      inputbox: {
          padding: '10px',
          margin: '10px',
          color: CommonBrand.getActiveColor()
  
      },
      styleswitch: {
         paddingTop: '15px',
         paddingBottom: '15px'
          
      },
      buttonCreate: {
          paddingRight: '10px',
          paddingLeft: '10px',
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
      
      
}