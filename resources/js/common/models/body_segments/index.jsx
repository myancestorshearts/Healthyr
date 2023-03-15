import React from "react";
import toastr from "toastr";
import ApiAdmin from '../../api/admin'
import FlexContainer from "../../components/flex-container";
import Input from "../../inputs/field";
import Button from "../../inputs/button";
import CommonBrand from '../../../common/brand'


export default class BodySegments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
           
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }

    // handles the add component on the forms 
    handleAdd() {

    }

    // handles the save component on the forms
    handleSave() {
        ApiAdmin.Generic.set({classkey:'bodysegments', id: this.props.model.id, ...this.state}, success => {
            if(this.props.onSave) this.props.onSave(success.data.model)
        },
        failure => {
            toastr.error(failure.message)
        }
        )
    }

    render() {
        return(
            <React.Fragment>
                
                
                <div>
                    <FlexContainer direction='column' gap="15px">
                        <Input
                            onChange={e => this.setState({ name: e.target.value})}
                            title="Name"
                            value={this.state.name}
                        />
                        
                    </FlexContainer>

                </div>
                <div style={STYLES.buttonContainer}>
                    <button onClick={() => this.handleSave()} stylesbutton={STYLES.button}>
                    Save
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

const STYLES = {
    button: {
        paddingRight: '20px',
        paddingLeft: '20px',
		height: '50px',
		backgroundColor: CommonBrand.getSecondaryColor(),
		border: 'none',
		borderRadius: '20px',
		boxShadow: 'rgb(180 204 222 / 20%) 5px 5px 10px',
		color: '#ffffff',
		fontWeight: 20,
		fontSize: '18px',
		fontFamily: 'Poppins',
        cursor: 'pointer',
        width: '100px'
    },
    buttonContainer: {
        marginTop: '15px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}