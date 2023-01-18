import React from 'react';
import InputText from "../../../../common/inputs/field"
import FlexContainer from '../../../components/flex-container';
import Spacer from '../../../../common/components/spacer';
import TextArea from '../../../../common/inputs/text-area'
import CommonBrand from '../../../../common/brand'
import toastr from 'toastr';

import ApiAdmin from '../../../api/admin';


export default class AddAnalyte extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                key: '',
                name: '',
                unit_of_measure: '',
                description: '',
            }
            this.handleSubmit = this.handleSubmit.bind(this)
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
        render() {
            return(
               <form onSubmit={this.handleSubmit}>
                
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
                      
                       <InputText 
                        autoFocus={true}
                        title='Unit of Measure'
                        onChange={e => this.setState({ unit_of_measure: e.target.value })}
                        value={this.state.unit_of_measure}
                       />

                        <TextArea 
                        autoFocus={true}
                        title='Description'
                        onChange={x => this.setState({ description: x})}
                        value={this.state.description}
                         />
                    </FlexContainer>
                   
              
                <div>
                    <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
						Save
					</button>
                </div>
               </form>
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
		fontFamily: 'Poppins'
	},
}