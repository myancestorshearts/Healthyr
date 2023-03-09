import React from 'react';
import InputText from "../../../../common/inputs/field"
import FlexContainer from '../../../components/flex-container';
import Spacer from '../../../../common/components/spacer';
import TextArea from '../../../../common/inputs/text-area'
import CommonBrand from '../../../../common/brand'
import toastr from 'toastr';
import InputSelect from '../../../inputs/select';
import ApiAdmin from '../../../api/admin';

const TYPE_OPTIONS= [
    {
      label: 'Range',
      value: 'RANGE',
    },
    {
      label: 'Binary',
      value: 'BINARY',
    },
]

export default class AddAnalyte extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                key: '',
                name: '',
                unit_of_measure: '',
                description: '',
                type: TYPE_OPTIONS[0].value,
                binary_false_effect: '',
                binary_true_effect:''
            }
            this.handleAdd = this.handleAdd.bind(this)
        }

        handleAdd() {
            this.loading = true;
            ApiAdmin.Generic.add({classkey: 'analyte', ...this.state}, success => {
                if (this.props.onAdd) this.props.onAdd(success.data.model);
            }, failure => {
                toastr.error(failure.message);
            })
        }

        render() {
            return(
                    <FlexContainer direction='column' gap='15px'>
                       <InputText 
                        autoFocus={true}
                        title='Key'
                        onChange={e => this.setState({ key: e.target.value })}
                        value={this.state.key}
                       />
                      
                       <InputText 
                        autoFocus={true}
                        title='Name'
                        onChange={e => this.setState({ name: e.target.value })}
                        value={this.state.name}
                       />

                        <InputSelect
                            options={TYPE_OPTIONS}
                            value={this.state.type}
                            onChange={(e) => { 
                                this.state.type = e.target.value;
                                this.forceUpdate();
                            }}
                            stylesselect={STYLES.selectInput}
                            stylescontainer={STYLES.selectContainer}
                        />
                        <TextArea 
                          autoFocus={true}
                          title='Description'
                          onChange={x => this.setState({ description: x})}
                          value={this.state.description}
                        />
                        
                        {this.state.type == 'BINARY' ?   
                        <div>
                            <InputText
                                onChange={e => this.setState({ binary_false_effect: e.target.value })}
                                title='Binary False Effect'
                                value={this.state.binary_false_effect} 
                            />
                            <InputText
                                onChange={e => this.setState({ binary_true_effect: e.target.value })}
                                title='Binary True Effect'
                                value={this.state.binary_true_effect} 
                            />
                        </div> 
                        :   

                        <InputText 
                        autoFocus={true}
                        title='Unit of Measure'
                        onChange={e => this.setState({ unit_of_measure: e.target.value })}
                        value={this.state.unit_of_measure}
                       />

                        }

                      
                       
                        <div>
                            <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
                                Add
                            </button>
                        </div>
                    </FlexContainer>
                   
              
               
              
            )
        }
}

const STYLES = {
    buttonCreate: {
		paddingRight: '10px',
        paddingLeft: '10px',
		height: '50px',
        width: '100px',
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
    selectInput: {
        height: '40px',
        fontSize: '20px',
        textAlign: 'center',
        border: 'none',
        
      },
      selectContainer: {
        border: 'solid #f1f4f9',
        borderRadius: '20px',
        maxWidth: '150px',
        padding: '15px',
      },
}