import React from 'react';
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import CommonBrand from '../../brand'
import ApiAdmin from '../../api/admin';
import toastr from 'toastr';

export default class VendorsKit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
            vendor_id: this.props.model.vendor_id,
            masterpack_id: this.props.model.masterpack_id,
            kit_id: this.props.model.kit_id,
            active: this.props.model.active,
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
            <div style={STYLES.textarea}>
                {/*DUPLICATE, DELETE the tests*/}
                
    
                {/* Save the test here */}
                <FlexContainer direction="column" gap="15px">
                
                
                
                <Input
                    autoFocus={true}
                    title='Vendor Id'
                    onChange={e => this.setState({ vendor_id: e.target.value })}
                    value={this.state.vendor_id}
                />
    
                <Input
                    autoFocus={true}
                    title='MasterPack Id'
                    onChange={e => this.setState({ masterpack_id: e.target.value })}
                    value={this.state.masterpack_id}
                />
                 <Input
                    autoFocus={true}
                    title='Kit Id'
                    onChange={e => this.setState({ kit_id: e.target.value })}
                    value={this.state.kit_id}
                />
                 <Input
                    autoFocus={true}
                    title='Active'
                    onChange={e => this.setState({ active: e.target.value })}
                    value={this.state.active}
                />
                
                <div style={STYLES.containerButton}>
                    <button style={STYLES.buttonCreate} onClick={() => this.handleSave()}>
                        Save
                    </button>
                </div>
                </FlexContainer>
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