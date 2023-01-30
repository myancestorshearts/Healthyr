import React from 'react';
import FlexContainer from "../../components/flex-container";
import Input from '../../inputs/field'
import CommonBrand from '../../brand'
import ApiAdmin from '../../api/admin';
import toastr from 'toastr';

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