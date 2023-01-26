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

export default class AddAnalyteRange extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                analyte_id: props.analyte.id,
                gender: '',
                pregnant: '',
                age_min_months: '',
                age_max_months: '',
                report_min: '',
                report_max: '',
                low_min: '',
                high_max: '',
                healthy_min: '',
                healthy_max: ''

            }
            this.handleSubmit = this.handleSubmit.bind(this)
            this.toggleClick = this.toggleClick.bind(this);
        }

        handleSubmit(e) {
            e.preventDefault()
            this.loading = true;
            ApiAdmin.Generic.add({classkey: 'analyte', ...this.state}, success => {
                if (this.props.onAdd) this.props.onAdd(success.data.model);
            }, failure => {
                toastr.error(failure.message);
            })
        }

        toggleClick(checked) {
            this.setState({
               checked
            })
        }

        render() {
            return(

                <React.Fragment>

                

               
                    <form onSubmit={this.handleSubmit} direction="column" gap='15px'>
                        <InputSelectModel
                            models={GENDER_OPTIONS}
                            value={this.state.genderOptions}
                            onChange={(x) => this.setState({ genderOptions: x })}
                            stylesselect={STYLES.selectInput}
                            stylescontainer={STYLES.selectContainer} />

                        <div style={STYLES.styleswitch}>
                            <Switch onChange={this.toggleClick} checked={this.state.checked} />
                        </div>

                        <Input
                            autoFocus={true}
                            title='Age Min Months'
                            onChange={e => this.setState({ age_min_months: e.target.age_min_months })}
                            value={this.state.age_min_months} />

                        <Input
                            autoFocus={true}
                            title='Age Max Months'
                            onChange={e => this.setState({ age_max_months: e.target.age_max_months })}
                            value={this.state.age_min_months} />
                        <Input
                            autoFocus={true}
                            title='Report Min'
                            onChange={e => this.setState({ report_min: e.target.report_min })}
                            value={this.state.report_min} />
                        <Input
                            autoFocus={true}
                            title='Report Max'
                            onChange={e => this.setState({ report_max: e.target.report_max })}
                            value={this.state.report_max} />
                        <Input
                            autoFocus={true}
                            title='Low Min'
                            onChange={e => this.setState({ low_min: e.target.low_min })}
                            value={this.state.low_min} />
                        <Input
                            autoFocus={true}
                            title='High Max'
                            onChange={e => this.setState({ high_max: e.target.high_max })}
                            value={this.state.high_max} />
                        <Input
                            autoFocus={true}
                            title='Healthy Min'
                            onChange={e => this.setState({ healthy_min: e.target.healthy_min })}
                            value={this.state.healthy_min} />
                        <Input
                            autoFocus={true}
                            title='Healthy Max'
                            onChange={e => this.setState({ healthy_max: e.target.healthy_max })}
                            value={this.state.healthy_max} />

                    
                    
                    <div>
                        <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
                            Save
                        </button>
                    </div>
                    
                </form>
             

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