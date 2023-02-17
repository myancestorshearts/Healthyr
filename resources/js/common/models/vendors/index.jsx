import React from 'react';
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import CommonBrand from '../../brand'
import ApiAdmin from '../../api/admin';
import Ellipses from '../../components/ellipses';
import Duplicate from '../../components/duplicate';
import toastr from 'toastr';
import TableSearch from '../../../common/portal/panel/table/search'


export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
            name: this.props.model.name,
            contact_name: this.props.model.contact_name,
            contact_email: this.props.model.contact_email,
            contact_phone: this.props.model.contact_phone,
            active: this.props.model.active
          
        }
       
        
    }

    handleSave() {
        
        this.loading = true;
        ApiAdmin.Generic.set({classkey:'vendor', id: this.props.model.id, ...this.state}, success => {
            if(this.props.onSave) this.props.onSave(success.data.model);
        },
        failure => {
            toastr.error(failure.message)
        }
        )
        
     }

 render() {
    return(
        <div style={STYLES.textarea}>
            {/*DUPLICATE, DELETE the tests*/}
            

            {/* Save the test here */}
            <FlexContainer direction="column" gap="15px">
            
            <div style={STYLES.containerButton}>
                <button style={STYLES.buttonCreate} onClick={() => this.handleSave()}>
                    Save
                </button>
            </div>
            
            <Input
                autoFocus={true}
                title='Name'
                onChange={e => this.setState({ name: e.target.value })}
                value={this.state.name}
            />

            <Input
                autoFocus={true}
                title='Contact Name'
                onChange={e => this.setState({ contact_name: e.target.value })}
                value={this.state.contact_name}
            />
             <Input
                autoFocus={true}
                title='Contact Email'
                onChange={e => this.setState({ contact_email: e.target.value })}
                value={this.state.contact_email}
            />
             <Input
                autoFocus={true}
                title='Contact Phone'
                onChange={e => this.setState({ contact_phone: e.target.value })}
                value={this.state.contact_phone}
            />
             <Input
                autoFocus={true}
                title='Active'
                onChange={e => this.setState({ active: e.target.value })}
                value={this.state.active}
            />
            </FlexContainer>


            
            <TableSearch
                classkey='vendorkit'
                vendor_id={this.props.model.id}
                ref={(e) => (this.table = e)}
                properties={{
                  masterpackid: {
                    title: 'Masterpack Id',
                    property: 'masterpack_id',
                    type: 'TEXT',
                    default: true,
                  },
                  kitid: {
                    title: 'Kit Id',
                    property: 'kit_id',
                    type: 'TEXT',
                    default: true,
                  },
                 active: {
                    title: 'Active',
                    property: 'active',
                    type: 'TEXT',
                    default: true
                  },
                 
    
                }}
                onSelectModel={this.handleSelectModel}
              />
           
        </div>
       
      
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
    containerButton: {
        padding: '15px',
        paddingBottom: '15px',
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 1
     },
     textarea: {
        padding: '20px',
    }
}