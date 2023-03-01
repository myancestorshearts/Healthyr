import React from 'react';
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import CommonBrand from '../../brand'
import ApiAdmin from '../../api/admin';
import TableSearch from '../../../common/portal/panel/table/search'
import toastr from 'toastr';
import Spacer from '../../components/spacer';



const VIEW_DASHBOARD = 'dashboard'
const VIEW_TABLE = 'table'

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
            name: this.props.model.name,
            key: this.props.model.key,
          
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
            
            {/* Save the test here */}
            <div style={STYLES.containerButton}>
                    <button style={STYLES.buttonCreate} onClick={() => this.handleSave()}>
                            Save
                    </button>
                </div>
                    
            <FlexContainer  gap="15px" direction="column">
            
                <Input
                    autoFocus={true}
                    title='Name'
                    onChange={e => this.setState({ name: e.target.value })}
                    value={this.state.name}
                />

                <Input
                    autoFocus={true}
                    title='Key'
                    onChange={e => this.setState({ key: e.target.value })}
                    value={this.state.key}
                />
            </FlexContainer>

            <Spacer />
            
            <TableSearch
            classkey='analyte'
            analyte_id={this.props.model.id}
            ref={(e) => (this.table = e)}
            properties={{
            key: {
            sortable: true,
            title: 'Key',
            property: 'key',
            type: 'TEXT',
            default: true,
            },
            name: {
            sortable: true,
            title: 'Name',
            property: 'name',
            type: 'TEXT',
            default: true,
            },
            unit: {
            sortable: true,
            title: 'Unit of Measure',
            property: 'unit_of_measure',
            type: 'TEXT',
            default: true,
            },
            description: {
            sortable: true,
            title: 'Description',
            property: 'description',
            type: 'TEXT',
            default: true
            }
            }}
            onSelectModel={this.handleSelectModel}
            />
         
           
        </div>
       
      
    )
 }
}

const STYLES = {
    containerInputs:{
        padding:'20px'
    },
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
    
     },
     textarea: {
        padding: '20px',
    }
}