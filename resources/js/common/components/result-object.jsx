import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../inputs/button'

import GraphComponent from './graph-component'

import Panel from './panel'
import {faCircleCheck, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'

import React from 'react';
export default class ResultObject extends React.Component {

	constructor(props)
	{
		super(props)
		this.state = {
			expand: false,
		}
	}

	render() {
		return(
			<div style={{marginBottom: '20px', width: '100%'}}>
				<Panel style={{paddingTop: '35px', paddingBottom: '35px', paddingLeft: (window.innerWidth > 1200) ? '20px' : '0px', paddingRight: (window.innerWidth > 1200) ? '20px' : '0px', boxShadow: (window.innerWidth > 1200) ? '2px 2px 5px #e7e4e9' : 'none' }}>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<div style={{fontSize: '14px'}}>
									{this.props.result.name} ({this.props.result.unit_of_measure})
								</div>
								<div style={{fontWeight: '700'}}>
									{RESULT_DICT[this.props.result.result_level]}
								</div>
							</div>
							<div onClick={() => this.setState({expand: (!this.state.expand)})} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
								<div style={{marginRight: '10px', fontSize: '12px'}}>
			                  {(this.state.expand) ? 'Show Less' : 'Show More'}
			               </div>
			               <div>
			                  <FontAwesomeIcon icon={(this.state.expand) ? faAngleUp : faAngleDown}/>
			               </div>
							</div>
						</div>
						{this.state.expand ? 
							<div style={{display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '10px'}}>
								<div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
									<div style={{fontSize: '14px', fontWeight: '700'}}>
										What is it?
									</div>
									<div style={{fontSize: '14px'}}>
										{this.props.result.description}
									</div>
								</div>
								<div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
									<div style={{fontSize: '14px', fontWeight: '700'}}>
										How does it affect me?
									</div>
									<div style={{fontSize: '14px'}}>
										{this.props.result.effect}
									</div>
								</div>
							</div>

							: null
						}
						<div style={{marginTop: '20px'}}>
							<GraphComponent
								result={this.props.result}
							/>
						</div>
					</div>
				</Panel>
			</div>
	   )
	}
    
}

const RESULT_DICT = {
	'L': 'Low',
	'N': 'Normal',
	'H' : 'High'
}