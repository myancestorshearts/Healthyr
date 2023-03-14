import React from 'react';
import Modal from './modal';
import Button from '../inputs/button'
import Text from '../inputs/text'
import Date from '../inputs/date'
import SelectModel from '../inputs/select-model'
import Boolean from '../inputs/boolean'
import Loading from './loading'
import HealthyrApi from '../api.jsx';
import toastr from 'toastr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'



export default class RegisterModal extends React.Component {

	constructor(props)
	{
		super(props)
		this.state = {
			kitID: '',
			testTaker: false,
			firstName: '',
			lastName: '',
			DOB: '',
			sex: '',
			phone: '',
			productConsent: '',
			researchConsent: '',
			loading: true,
			openWindow: 'registerUser',
			token: '',
			rightPerson: false,
		}
		this.handleContinue = this.handleContinue.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	componentDidMount(){
        let kitID = localStorage.getItem('kit_id')
        if(kitID != 'null' && kitID != null){
            kitID = kitID.replace('{','')
            kitID = kitID.replace('}','')
            this.setState({
                kitID: kitID
            })
        }
		/*HealthyrApi.User.getUser({
        }, success => {
        	console.log(success)
            this.setState({
            	loading: 'false',
            	openWindow: 'kitID',
            	firstName: success.data.platform_user.first_name,
            	lastName: success.data.platform_user.last_name,
            })
        }, fail => {
         this.setState({
         		loading: 'false',
            	openWindow: 'registerUser',
            })
        })*/
	}


	handleContinue(){
	/*	HealthyrApi.User.registerKit({
			kit_id: this.state.kitID
		}, success => {
			HealthyrApi.User.getRegistrationToken({
	        }, success => {
	            this.setState({
	            	token: success.data.token,
	            }, success  => {
                    localStorage.removeItem("kit_id")
	            }, fail => {
	            	console.log('fail', )
	            })
	        }, fail => {
	        	toastr.error(fail.message)
	         	console.log(fail)
	        })
			this.setState({continueMenu: false})
		}, fail => {
			toastr.error(fail.message)
			console.log(fail)
		})*/
	}

	handleRegister(){
		/*HealthyrApi.User.registerUser({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: window.customerHub.customer_email,
            date_of_birth: (this.state.DOB.formatDate('n/d/Y')),
            gender: this.state.sex.id,
            phone: this.state.phone,
        }, success => {
        	this.setState({
            	openWindow: 'kitID',
            })
        }, fail => {
        	toastr.error(fail.message)
         	console.log(fail)
        })*/
	}



	render() {
		return (
			<Modal
                width='480px'
                height= '100%'
                onClickOutside={this.props.handleClose}
                backgroundColor={'#ffffff'}
            >
            	<div style={{position: 'relative', overflow: 'auto'}}>
            		<div style={{position: 'absolute', left: '20px', top: '20px', cursor: 'pointer'}} onClick={this.props.handleClose}>
            			<FontAwesomeIcon icon={faAngleLeft}/>
            		</div>
	            	{(this.state.kitID != '' && this.state.token != '')?
	                	<iframe style={{maxWidth: '100%', border: 'none'}} width="460" height={window.outerHeight} src={'https://mytest.behealthyr.com/register/'+this.state.kitID+'?rt='+this.state.token}/>
	                	:
	                	<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px', height: '100%', maxWidth: '100%'}}>
		                	<img
		                		style={{width: '160px'}}
		                		src={'//cdn.shopify.com/s/files/1/0569/4285/4214/files/healthyr_895a381e-2f67-48cf-9aa5-cd6fd7e56cd4.png?v=1657300409'}
		                	/>
		                	<div style={{fontSize: '24px', fontWeight: '700', marginTop: '20px'}}>
		                		Register kit
		                	</div>
		                	<Loading loading={(this.state.loading) ? this.state.loading : false}>
			                	{(this.state.openWindow == 'kitID') ? 
			                		<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20px', width: '100%'}}>
				                		<div style={{fontSize: '13px'}}>
				                        	Hello {this.state.firstName + ' ' + this.state.lastName}
				                        </div>
				                		<Text 
				                           title='Kit ID'
				                           onChange={e => this.setState({kitID: e.target.value})}
				                           value={this.state.kitID}
				                           styleslabel={{fontWeight: '700', fontSize: '13px'}}
				                           placeholder={'Kit ID'}
				                        />
				                        <div style={{fontSize: '13px'}}>
				                        	Enter the kit ID found on your kit’s instructions.
				                        </div>
					                    <Boolean value={this.state.rightPerson} onChange={e => this.setState({rightPerson: !this.state.rightPerson})}>
					                    	<div style={{fontSize: '13px',}}>
					                    		You are registering as {this.state.firstName} {this.state.lastName}. If this is not the person taking the test, please sign in or create an account.
					                    	</div>
					                    </Boolean>
					                    {this.state.rightPerson ? 

					                    <Button 
					                        color={'#130168'}
					                        stylesbutton={{marginTop: '20px', padding: '20px', borderRadius: '4px', fontSize: '14px'}}
					                        props={{onClick: this.handleContinue}}
					                        invert={true}
					                    >
					                        Register Kit
					                    </Button>
					                    : 
					                    <Button 
					                        color={'#c4c7c5'}
					                        stylesbutton={{marginTop: '20px', padding: '20px', borderRadius: '4px', fontSize: '14px', cursor: 'default'}}
					                        invert={true}
					                    >
					                        Register Kit
					                    </Button>
					                	}
				                	</div>
			                		

			                		:
			                		<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20px', height: '100%', maxWidth: '100%', width: '100%'}}>
				                        <div style={{marginTop: '20px', width: '100%'}}>
					                        <Text 
					                           title='First Name'
					                           onChange={e => this.setState({firstName: e.target.value})}
					                           value={this.state.firstName}
					                           styleslabel={{fontWeight: '700', fontSize: '13px'}}
					                           placeholder={'First Name'}
					                        />
					                    </div>
					                    <div style={{marginTop: '20px', width: '100%'}}>
					                        <Text 
					                           title='Last Name'
					                           onChange={e => this.setState({lastName: e.target.value})}
					                           value={this.state.lastName}
					                           styleslabel={{fontWeight: '700', fontSize: '13px'}}
					                           placeholder={'Last Name'}
					                        />
					                    </div>
					                    <div style={{marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
					                    	<div style={{flex: '1', minWidth: '100%'}}>
						                        <Date 
						                           title='Date of Birth'
						                           handleChange={e => this.setState({DOB: e})}
						                           value={this.state.DOB}
						                           styleslabel={{fontWeight: '700', fontSize: '13px'}}
						                           stylescontainer={{marginRight: '20px'}}
						                           placeholder={'mm/dd/yyyy'}
						                        />
						                    </div>
						                    <div style ={{flex: '1'}}>
						                        <SelectModel 
								                    title='Gender'
								                    models={GENDERDICT}
								                    value={this.state.sex}
								                    onChange={x => this.setState({sex: x})}
								                />
								            </div>
					                    </div>
					                    <div style={{marginTop: '20px', width: '100%'}}>
					                        <Text 
					                           title='Phone'
					                           onChange={e => this.setState({phone: e.target.value})}
					                           value={this.state.phone}
					                           styleslabel={{fontWeight: '700', fontSize: '13px'}}
					                           placeholder={'Phone number'}
					                        />
					                    </div>
					                    <Button 
					                        color={'#130168'}
					                        stylesbutton={{marginTop: '20px', padding: '20px', borderRadius: '4px', fontSize: '14px'}}
					                        props={{onClick: this.handleRegister}}
					                        invert={true}
					                    >
					                        Register User
					                    </Button>
				                    </div>
			                	}
		                </Loading>
	                </div>
	                }
	            </div>
            </Modal>
		)
	}
    
}


const GENDERDICT =	[
	{
		name: 'Male',
		id: 'M'
	},
	{
		name: 'Female',
		id: 'F'
	},
	{
		name: 'Other',
		id: 'O'
	},

]

