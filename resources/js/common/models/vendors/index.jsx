import React from 'react';
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import CommonBrand from '../../brand'
import ApiAdmin from '../../api/admin';
import Ellipses from '../../components/ellipses';
import Duplicate from '../../components/duplicate';
import toastr from 'toastr';
import Spacer from '../../components/spacer';

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
        ApiAdmin.Generic.set({classkey:'test', id: this.props.model.id, ...this.state}, success => {
            if(this.props.onSave) this.props.onSave(success.data.model);
        },
        failure => {
            toastr.error(failure.message)
        }
        )
        
     }

 render() {
    return(
        <div>
            {/*DUPLICATE, DELETE the tests*/}
            

            {/* Save the test here */}
            <FlexContainer direction="column" gap="15px">
            
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

            <div>
                <button style={STYLES.buttonCreate} onClick={() => this.handleSave()}>
                    Save
                </button>
            </div>
            
           
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
     }
}