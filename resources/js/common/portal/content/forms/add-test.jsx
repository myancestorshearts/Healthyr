import React from 'react';
import TextArea from '../../../inputs/text-area'
import InputText from "../../../../common/inputs/field"
import FlexContainer from '../../../components/flex-container';
import CommonBrand from '../../../../common/brand'
import toastr from 'toastr';
import ApiAdmin from '../../../api/admin';



export default class AddTest extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
             
                name:'',
                key: '',
                description: '',
                sku:'',
                upc:'',
                ean:'',
                
            }
            this.handleAdd = this.handleAdd.bind(this)
        }

        
        handleAdd() {
            this.loading = true;
            ApiAdmin.Generic.add({classkey: 'test', ...this.state}, success => {
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
                        title='Name'
                        onChange={e => this.setState({ key: e.target.value })}
                        value={this.state.key}
                       />
                        <InputText 
                        autoFocus={true}
                        title='Key'
                        onChange={e => this.setState({ name: e.target.value })}
                        value={this.state.name}
                       />
                        <TextArea
                        autoFocus={true}
                        title='Description'
                        onChange={e => this.setState({ description: e.target.value })}
                        value={this.state.description}
                       />
                        <InputText 
                        autoFocus={true}
                        title='Sku'
                        onChange={e => this.setState({ sku: e.target.value })}
                        value={this.state.sku}
                       />
                        <InputText 
                        autoFocus={true}
                        title='Upc'
                        onChange={e => this.setState({ upc: e.target.value })}
                        value={this.state.upc}
                       />
                        <InputText 
                        autoFocus={true}
                        title='Ean'
                        onChange={e => this.setState({ ean: e.target.value })}
                        value={this.state.ean}
                       />
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
}