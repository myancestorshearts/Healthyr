import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../inputs/button'

import { faCircleCheck, faCircleExclamation, faCircleXmark, faAngleDown, faAngleRight, faAngleLeft, faAngleUp, faDownload } from '@fortawesome/free-solid-svg-icons'

import { faUsps } from '@fortawesome/free-brands-svg-icons'

import ResultObject from './result-object'

import GraphComponent from './graph-component'

import CommonFunctions from '../functions'

import Responsive from './responsive'

import Modal from './modal';

import Panel from './panel'

import Accordion from './accordion'

import React from 'react';
export default class TestObject extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			expand: false,
			popOut: false
		}
		this.handleClose = this.handleClose.bind(this);
	}


	handleClose(){
		this.setState({popOut: false})
	}


	render() {
		let created_date = (this.props.test.events.length > 0) ? new Date((this.props.test.events[this.props.test.events.length - 1]).created) : null
		let most_recent = (this.props.test.samples[0].events.length > 0) ? new Date(this.props.test.samples[0].events[0].created) : (this.props.test.events.length > 0) ? new Date(this.props.test.events[0].created) : null

		let healthy = 0
		let warning = 0
		let unhealthy = 0
		if(this.props.test.samples[0].report.results && this.props.test.samples[0].report.results.length > 0){
			this.props.test.samples[0].report.results.map((resultObject) => {
				if(resultObject.range_placement == 'healthy'){
					healthy += 1
				}else if(resultObject.range_placement == 'warning'){
					warning += 1
				}else if(resultObject.range_placement == 'unhealthy'){
					unhealthy += 1
				}
			})
		}

		let options = {
		  hour: 'numeric', minute: 'numeric',
		  timeZoneName: 'short'
		};

		let isShipping = (created_date != null && most_recent != null && (this.props.test.samples[0].events.some(e => e.status == 'in_transit') || this.props.test.samples[0].events.some(e => e.status == 'placed_in_mail')))
		let trackingNumber = (isShipping) ? this.props.test.samples[0].shipments[0].tracking_number : null
		let currentStatus = STATUS_DICT[(this.props.test.samples[0].events.length > 0) ? this.props.test.samples[0].events[0].status : (this.props.test.events.length > 0) ? this.props.test.events[0].status : this.props.test.status]
		if(window.innerWidth < 1200){
			return(
		      <div style={{...STYLES.outerContainer, ...{position: 'relative'}}}>
		         <div onClick={() => this.setState({ popOut: true })} style={STYLES.testContainer}>
		            <div style={{paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '20px', flex: '3',}}>
		               <div>
		                  {(created_date != null) ? created_date.toLocaleDateString() : null}
		               </div>
		               <div style={{fontSize: '16px', fontWeight: '700', whiteSpace: 'nowrap'}}>
		                  {PANEL_DICT[this.props.test.panels[0]]}
		               </div>
		               <div>
		               		Kit ID: {this.props.test.kit_id}
		               </div>
		               <div>
		                  {(this.props.test.samples[0].report.results) ? (this.props.test.samples[0].report.results.length > 0 ? this.props.test.samples[0].report.results.length + ' biomarkers tested' : null) : null}
		               </div>
		               <div style={{display: 'flex', flexDirection: 'row', fontSize: '14px',}}>
			               <div style={{marginRight: '20px', color: ((currentStatus in ICONS) ? ICONS[currentStatus].color : null)}}>
			               		<FontAwesomeIcon icon={(currentStatus in ICONS) ? (ICONS[currentStatus].icon) : null} size={'1.8x'}/>
			               </div>
			               <div style={{display: 'flex', flexDirection: 'row'}}>
			                  <div style={{ fontWeight: '700'}}>
			                     {currentStatus == 'Resulted' ? 'Results' : (currentStatus != null) ? CommonFunctions.capitalizeFirstLetter(currentStatus) : null}
			                  </div>
		                  </div>
	                  </div>
	                  <div style={{display: 'flex', flexDirection: 'row'}}>

	                     <div  style={{marginRight: '10px', whiteSpace: 'nowrap'}}>
	                        {(most_recent != null) ? 'Updated: ' + most_recent.formatDate('n/d/Y ') : null}
	                     </div>
	                     <div style={{whiteSpace: 'nowrap'}}>
	                        {(most_recent != null) ? most_recent.formatDate('H:m A') : null}
	                     </div>
	                  </div>
		            </div>
		            <div style={{position: 'absolute', right: '10px', justifyContent: 'center', cursor: 'pointer'}}>
		            	<FontAwesomeIcon size={'2x'} icon={faAngleRight}/>
		            </div>
		         </div>

		         {
		         	this.state.popOut ?
		         	<Modal
		                width='480px'
		                height= '100%'
		                onClickOutside={this.handleClose}
		                backgroundColor={'#E7E7E7'}
		                overflow={'auto'}
		            >	
		            	<div onClick={() => this.setState({ popOut: false })} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', cursor: 'select', marginTop: '20px'}}>
		            		<div style={{marginRight: '16px', fontSize: '16px'}}>
               					<FontAwesomeIcon icon={faAngleLeft}/>
               				</div>
               				<div style={{fontWeight: '700', fontSize: '16px'}}>
               					My health screenings
               				</div>
	               		</div>
		            	<Panel style={{boxShadow: 'rgb(231, 228, 233) 1px 2px 10px 5px', borderRadius: '3px'}}>
			            	<div style={{position: 'relative'}}>
			            		<div style={{position: 'absolute', right: '0px', top: '0px'}}>
			               			{currentStatus == 'Resulted' ? 
			               				<FontAwesomeIcon onClick={() => {window.open(this.props.test.samples[0].report.pdf)}} icon={faDownload} size={'1.8x'}/>
			               			: null
			               			}
			               		</div>
				            	<div style={STYLES.testContainer}>
						            <div style={{paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', flex: '3'}}>
						               <div style={STYLES.smallText}>
						                  {(created_date != null) ? created_date.toLocaleDateString() : null}
						               </div>
						               <div style={{fontSize: '16px', fontWeight: '700', whiteSpace: 'nowrap'}}>
						                  {PANEL_DICT[this.props.test.panels[0]]}
						               </div>
						               <div style={STYLES.smallText}>
						               		Kit ID: {this.props.test.kit_id}
						               </div>
						               <div style={{display: 'flex', flexDirection: 'row'}}>
							               <div style={{marginRight: '20px', color: (ICONS[currentStatus].color)}}>
							               		<FontAwesomeIcon icon={(currentStatus in ICONS) ? (ICONS[currentStatus].icon) : null} size={'1.8x'}/>
							               </div>
							               <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							                  <div style={{fontSize: '16px', fontWeight: '700'}}>
							                     {currentStatus == 'Resulted' ? 'Results Available' : (currentStatus != null) ? CommonFunctions.capitalizeFirstLetter(currentStatus) : null}
							                  </div>
						                  </div>
					                  </div>
					                  <div style={{display: 'flex', flexDirection: 'row', fontSize: '12px'}}>

					                     <div  style={{marginRight: '10px', whiteSpace: 'nowrap'}}>
					                        {(most_recent != null) ? 'Updated: ' + most_recent.formatDate('n/d/Y ') : null}
					                     </div>
					                     <div style={{whiteSpace: 'nowrap'}}>
					                        {(most_recent != null) ? most_recent.formatDate('H:m A') : null}
					                     </div>
					                  </div>					                  
					                  {this.props.test.samples[0].report.results && this.props.test.samples[0].report.results.length > 0 ?
						                  <div style={{display: 'flex', marginTop: '24px'}}>
						                  	<div style={{fontSize: '14px', fontWeight: '700', marginRight: '15px'}}>
						                  		Biomarkers
						                  	</div>
						                  	<div style={{display: 'flex'}}>
						                  		<NumIcon
						                  			color={'#6DD58C'}
						                  			icon={faCircleCheck}
						                  			number={healthy}

						                  		/>
						                  		<NumIcon
						                  			color={'#FBB91C'}
						                  			icon={faCircleExclamation}
						                  			number={warning}
						                  		/>
						                  		<NumIcon
						                  			color={'#FF6668'}
						                  			icon={faCircleXmark}
						                  			number={unhealthy}
						                  		/>
						                  	</div>
						                  </div>

						                  : 
						                  isShipping ? 
						                  	<div style={{display: 'flex', flexDirection: 'column', fontWeight: '700'}}>
						                  		<div style={{fontSize: '14px'}}>
						                  			Tracking #
						                  		</div>
						                  		<div style={{fontSize: '16px', textDecoration: 'underline'}} onClick={() => {window.open("https://tools.usps.com/go/TrackConfirmAction_input?strOrigTrackNum=" + trackingNumber)}}>
						                  			{trackingNumber}
						                  		</div>
						                  	</div>
						                  	: null
						                  
						                }
						            </div>
						            {this.state.expand  && this.props.test.samples[0].report.results ? 
							         	<div style={{width: '100%', borderTop: '1px solid #bfbfbf'}}>
								         	<div style={{display: 'flex', flexDirection: 'row', width: '100%', paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px', paddingTop: '20px', paddingBottom: '20px', fontSize: '12px'}}>
								         		<div style={{...STYLES.resultInfo, ...{paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px'}}}>
								         			{this.props.test.samples[0].report.results ? (this.props.test.samples[0].report.results.length > 0 ? this.props.test.samples[0].report.results.map((resultObject) => {
							                        	return(
								                           <ResultObject
								                              result={resultObject}
								                              panel={this.props.test.panels[0]}
								                              gender={this.props.test.samples[0].report.individual.sex}
								                           />
							                       		)        		
							               	}) : null) : null
							                  }
								         		</div>
								         	</div>


											<div style={{ marginTop: '20px', width: '100%', borderTop: '1px solid #bfbfbf' }} onClick={() => this.setState({ expand: false })}>
												<div style={{ marginTop: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
													<div style={{ marginRight: '10px', fontSize: '12px', fontWeight: '700' }}>
														View less
													</div>
													<div style={{fontSize: '12px'}}>
														<FontAwesomeIcon icon={faAngleUp} />
													</div>
												</div>
											</div>
										</div>
										:
										<div style={{ width: '100%' }}>
											{this.props.test.samples[0].report.results ? (this.props.test.samples[0].report.results.length > 0 ?
												<div style={{marginTop: '20px',  width: '100%', borderTop: '1px solid #bfbfbf' }} onClick={() => this.setState({ expand: true })}>
													<div style={{ marginTop: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
														<div style={{marginRight: '10px', fontSize: '12px', fontWeight: '700'}}>
															View more
														</div>
														<div>
															<FontAwesomeIcon icon={faAngleDown} />
														</div>
													</div>
												</div>
												: null) : null
											}
										</div>

										}	
						        </div>
					        </div>
					    </Panel>
						{
							currentStatus == 'Resulted' ?
							<Panel style={{boxShadow: 'rgb(231, 228, 233) 1px 2px 10px 5px', borderRadius: '3px', marginTop: '24px'}}>
								<Accordion
									extend={true}
									title={'Book an online visit'}
									image={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/sesame%202.jpg?v=1668652153'}
									buttonText={'Book an Appointment'}
									text={'Share your results with a doctor today with convenient online visits from Sesame Care.'}
									url={'https://sesamecare.com/partners/healthyr?utm_source=account_dashboard'}
								/>
								<Accordion
									title={'Find affordable prescriptions'}
									image={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/cuverd2.jpg?v=1668652131'}
									buttonText={'View prescription options'}
									text={"Don't break the bank on medications. Explore affordable options with Cuverd."}
									url={'https://behealthyr.com/pages/cuverd'}
								/>
								<Accordion
									title={'Prescriptions at your doorstep'}
									image={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/healthyrx.jpg?v=1668652115'}
									buttonText={'View prescription options'}
									text={"We deliver affordable, high-quality, FDA approved medications directly to your doorstep."}
									url={'https://healthyr.manifestrx.com/'}
								/>
							</Panel>

						     :
						     null
						 }
						 <div style={{minHeight: '24px'}}>
						 	<span/>
						 </div>
		            </Modal>

		            : null

		         }


				</div>
		)
	} else {

		return(
	      <div style={{...STYLES.outerContainer, ...{boxShadow: (window.innerWidth > 1200) ? 'rgb(231, 228, 233) 1px 2px 10px 5px' : 'none', position: 'relative'}}}>
	         <div style={STYLES.testContainer}>
	            <div style={{paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px', paddingBottom: '20px', flex: '3',}}>
	               <div>
	                  {(created_date != null) ? created_date.toLocaleDateString() : null}
	               </div>
	               <div style={{fontSize: '16px', fontWeight: '700'}}>
	                  {PANEL_DICT[this.props.test.panels[0]]}
	               </div>
	               <div style={{fontWeight: '600px'}}>
	               		KIT ID - {this.props.test.kit_id}
	               </div>
	               <div>
	                  {(this.props.test.samples[0].report.results) ? (this.props.test.samples[0].report.results.length > 0 ? this.props.test.samples[0].report.results.length + ' biomarkers tested' : null) : null}
	               </div>
	            </div>
	            <div style={{paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: '2', justifyContent: 'flex-start'}}>
	               <div style={{display: 'flex', flexDirection: 'column', marginRight: '80px'}}>
	                  <div style={{display: 'flex', flexDirection: 'row'}}>
	                  	<div style={{display: 'flex'}}>
		                  	<div style={{whiteSpace: 'nowrap', marginRight: '10px', fontWeight: '600'}}>
		                  		Status Update |
		                  	</div>
		                     <div  style={{marginRight: '10px'}}>
		                        {(most_recent != null) ? most_recent.formatDate('n/d/Y ') : null}
		                     </div>
		                     <div style={{whiteSpace: 'nowrap'}}>
		                        {(most_recent != null) ? new Intl.DateTimeFormat('en-AU', options).format(most_recent) : null}
		                     </div>
		                  </div>
	                  </div>
	                  <div>
		                  <div style={{fontSize: '18px', fontWeight: '700'}}>
		                     {currentStatus == 'Resulted' ? 'Completed' : (currentStatus != null) ? CommonFunctions.capitalizeFirstLetter(currentStatus) : null}
		                  </div>
		               </div>
		               {currentStatus == 'Resulted' ?
		               	<div style={{display: 'flex'}}>
	                  		<NumIcon
	                  			color={'#6DD58C'}
	                  			icon={faCircleCheck}
	                  			number={healthy}

	                  		/>
	                  		<NumIcon
	                  			color={'#FBB91C'}
	                  			icon={faCircleExclamation}
	                  			number={warning}
	                  		/>
	                  		<NumIcon
	                  			color={'#FF6668'}
	                  			icon={faCircleXmark}
	                  			number={unhealthy}
	                  		/>
	                  	</div>
	                  	:
	                  	 <div style={{display: 'flex'}}>
	                  	 	<div style={{color: ((currentStatus in ICONS) ? ICONS[currentStatus].color : null), marginRight: '10px'}}>
			               		<FontAwesomeIcon icon={(currentStatus in ICONS) ? (ICONS[currentStatus].icon) : null} size={'1.8x'}/>
			               	</div>
			               	{isShipping ?
			               	<div style={{fontSize: '14px', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {window.open("https://tools.usps.com/go/TrackConfirmAction_input?strOrigTrackNum=" + trackingNumber)}}>
	                  			{trackingNumber}
	                  		</div>
	                  		: null
	                  		}
			             </div>
		               }
	               </div>
	            </div>
	         </div>
	         {this.state.expand  && this.props.test.samples[0].report.results ? 
	         	<div style={{width: '100%'}}>
		         	<div style={{display: 'flex', flexDirection: 'row', width: '100%', paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px', paddingTop: '20px', paddingBottom: '20px'}}>
		         		<div style={{...STYLES.resultInfo, ...{paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px'}}}>
		         			{this.props.test.samples[0].report.results ? (this.props.test.samples[0].report.results.length > 0 ? this.props.test.samples[0].report.results.map((resultObject) => {
	                        	return(
		                           <ResultObject
		                              result={resultObject}
		                              panel={this.props.test.panels[0]}
		                              gender={this.props.test.samples[0].report.individual.sex}
		                           />
	                       		)        		
	               	}) : null) : null
	                  }
		         		</div>
		         		<Responsive min={1200}>
			         		<div style={{flex: '2', display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
			         			<Accordion
									extend={true}
									title={'Book an online visit'}
									image={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/sesame%202.jpg?v=1668652153'}
									buttonText={'Book an Appointment'}
									text={'Share your results with a doctor today with convenient online visits from Sesame Care.'}
									url={'https://sesamecare.com/partners/healthyr?utm_source=account_dashboard'}
								/>
								<Accordion
									title={'Find affordable prescriptions'}
									image={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/cuverd2.jpg?v=1668652131'}
									buttonText={'View prescription options'}
									text={"Don't break the bank on medications. Explore affordable options with Cuverd."}
									url={'https://behealthyr.com/pages/cuverd'}
								/>
								<Accordion
									title={'Prescriptions at your doorstep'}
									image={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/healthyrx.jpg?v=1668652115'}
									buttonText={'View prescription options'}
									text={"We deliver affordable, high-quality, FDA approved medications directly to your doorstep."}
									url={'https://healthyr.manifestrx.com/'}
								/>
			         		</div>
			         	</Responsive>
		         	</div>


						<div style={{ width: '100%', borderTop: '1px solid #bfbfbf' }} onClick={() => this.setState({ expand: false })}>
							<div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px'}}>
								<div style={{ marginRight: '10px', fontSize: '12px' }}>
									Hide test results
								</div>
								<div>
									<FontAwesomeIcon icon={faAngleUp} />
								</div>
							</div>
						</div>
					</div>






					:
					<div style={{ width: '100%' }}>
						{this.props.test.samples[0].report.results ? (this.props.test.samples[0].report.results.length > 0 ?
							<div style={{ width: '100%', borderTop: '1px solid #bfbfbf' }} onClick={() => this.setState({ expand: true })}>
								<div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px'}}>
									<div style={{ marginRight: '10px', fontSize: '12px' }}>
										View
									</div>
									<div>
										<FontAwesomeIcon icon={faAngleDown} />
									</div>
								</div>
							</div>
							: null) : null
						}
					</div>

					}
					<div style={{position: 'absolute', right: '10px', bottom: '10px'}}>
         			{currentStatus == 'Resulted' ?
         				<Button 
         					color={'#130168'}
                        invert={true}
                        tagName={'div'}
				            stylesbutton={{fontSize: '14px', borderRadius: '4px', marginTop: '0px', paddingTop: '16px', paddingBottom: '16px', maxHeight: '16px'}}
				            props={{onClick: () => window.open(this.props.test.samples[0].report.pdf)}}
				         >
         					<div style={{display: 'flex', alignItems: 'center'}}>
         						<div style={{marginRight: '8px'}}>
         							Download Report
         						</div>
         						<FontAwesomeIcon icon={faDownload}/>
         					</div>
         				</Button>
         			: null
         			}
         		</div>
				</div>
			)
		}
	}

}

const NumIcon = (props) => {
        if(props.number > 0) {
        	return(
	            <div style={{display: 'flex', fontSize: '14px', fontWeight: '600', marginRight: '10px'}}>
	            	<div style={{marginRight: '10px'}}>
	            		{props.number}
	            	</div>
	            	<div style={{color: props.color}}>
	            		<FontAwesomeIcon icon={props.icon} />
	            	</div>
	            </div>
	        )
	    } else {
	    	return null
	    }
}


const ICONS = {
	'Resulted': {icon: faCircleCheck, color: '#6DD58C'},
	'In Transit': {icon: faUsps, color: '#16006D'},
	'Rejected': {icon: faCircleExclamation, color: '#FF6668'},
	'Delivery Exception': {icon: faCircleExclamation, color: '#FF6668'},
	'Collection Exception': {icon: faCircleExclamation, color: '#FF6668'},
}

const STYLES = {
	title: {
		fontSize: '20px',
	},
	infoTitle: {
		fontWeight: '700',
		fontSize: '18px',
		marginRight: '10px',
	},
	trendContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		flex: '1',
		padding: '20px',
		position: 'relative',
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	adContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	adLink: {
		textDecoration: 'underline',
		cursor: 'pointer'
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		flex: '1',
	},
	testContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		flexWrap: 'wrap',
	},
	outerContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		boxShadow: 'rgb(231, 228, 233) 1px 2px 10px 5px',
		marginBottom: '20px',
		borderRadius: '3px'
	},
	testInfo: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: '20px',
		flex: '3',
	},
	resultInfo: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: '20px',
		flex: '3',
	},
	testStatus: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '20px',
		flex: '2',
		justifyContent: 'flex-start'
	},
	trendsBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'stretch',
	},
	trendBubble: {
		position: 'absolute',
		zIndex: '3',
		right: '0px',
		top: '5px',
		backgroundColor: '#0B57D0',
		color: '#ffffff',
		borderRadius: '24px',
		fontSize: '13px',
		paddingLeft: '10px',
		paddingRight: '10px',
	},
	smallText: {
		fontSize: '12px',
	}
}


const PANEL_DICT = {
	cardiovascular_health_screening_panel: 'Cardiovascular Test',
	diabetes_panel: 'Prediabetes Test',
	female_fertility_health_screening_panel: 'Female Fertility Test',
	athletic_performance_panel: 'Athletic Performance Test',
	male_hormone_screening_panel: 'Male Hormone Test',
	comprehensive_health_panel: 'Comprehensive Test',
	micronutrient_panel: 'Micronutrient Test',
}

const STATUS_DICT = {
	registered: 'Registered',
	delivered: 'Delivered',
	in_transit: 'In Transit',
	preparing: 'Preparing',
	collected: 'Collected',
	received: 'Received',
	awaiting_collection: 'Awaiting Collection',
	resulted: 'Resulted',
	rejected: 'Rejected',
	delivery_exception: 'Delivery Exception',
	collected: 'Collected',
	collection_exception: 'Collection Exception'



}