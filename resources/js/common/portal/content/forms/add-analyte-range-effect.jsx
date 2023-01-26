import React from 'react';
import InputText from "../../../inputs/field"
import FlexContainer from '../../../components/flex-container';
import InputTextArea from '../../../inputs/text-area'
import CommonBrand from '../../../brand'
import toastr from 'toastr';
import ApiAdmin from '../../../api/admin';


export default class AddAnalyteRangeEffect extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                analyte_range_id: props.analyteRange.id,
                min: '',
                max: '',
                effect: '',
            }
            this.handleSubmit = this.handleSubmit.bind(this)
        }

        handleSubmit(e) {
            e.preventDefault()
            this.loading = true;
            ApiAdmin.Generic.add({classkey: 'analyterangeeffect', ...this.state}, success => {
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
                        title='Min'
                        onChange={e => this.setState({ min: e.target.value })}
                        value={this.state.min}
                       />
                     
                       <InputText 
                        autoFocus={true}
                        title='Max'
                        onChange={e => this.setState({ max: e.target.value })}
                        value={this.state.max}
                       />
                      
                       <InputTextArea
                        autoFocus={true}
                        title='Effect'
                        onChange={x => this.setState({ effect: x})}
                        value={this.state.effect}
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