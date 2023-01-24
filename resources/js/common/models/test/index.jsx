import React from 'react';
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import CommonBrand from '../../brand'
import ApiAdmin from '../../api/admin';
import AddTest from '../../../common/portal/content/forms/add-test';
import toastr from 'toastr';
import SidePanel from '../../portal/panel/side-panel';

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
            name: this.props.model.name,
            key: this.props.model.key,
          
        }
        //this.handleAdd = this.handleAdd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.loading = true;
        ApiAdmin.Generic.add({classkey: 'tests', ...this.state}, success => {
            if (this.props.onAdd) this.props.onAdd(success.data.model);
        }, failure => {
            toastr.error(failure.message);
        })
    }

    // handleAdd() {
    //     SidePanel.pushStart( 'Add Analyte',
    //     <AddTest
    //       analyte = {this.props.model}
    //       onAdd={() => {
    //         SidePanel.pop();
    //         if (this.table) this.table.handleSearch();
    //       }}
    //     />
    //     )
    //     }

 render() {
    return(
        <div>
             <form onSubmit={this.handleSubmit} direction="column" gap='15px'>
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
                        onChange={e => this.setState({ name: e.target.value })}
                        value={this.state.key}
                    />
                    </FlexContainer>

                    <div>
                        <button style={STYLES.buttonCreate} onClick={() => this}>
                            Save
                        </button>
                    </div>
             </form>
           
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
}