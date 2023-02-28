import React from 'react';
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import CommonBrand from '../../brand'
import ApiAdmin from '../../api/admin';
import TableSearch from '../../../common/portal/panel/table/search'
import toastr from 'toastr';


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
                title='Key'
                onChange={e => this.setState({ key: e.target.value })}
                value={this.state.key}
            />
            </FlexContainer>

            <div>
                <button style={STYLES.buttonCreate} onClick={() => this.handleSave()}>
                    Save
                </button>
            </div>
            
            <TableSearch
            classkey='analyte'
            searchArgs={{
                test_id: this.props.model.id
            }}
            ref={(e) => (this.table = e)}
            properties={{
            key: {
            title: 'Key',
            property: 'key',
            type: 'TEXT',
            default: true,
            },
            name: {
            title: 'Name',
            property: 'name',
            type: 'TEXT',
            default: true,
            },
            unit: {
            title: 'Unit of Measure',
            property: 'unit_of_measure',
            type: 'TEXT',
            default: true,
            },
            description: {
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