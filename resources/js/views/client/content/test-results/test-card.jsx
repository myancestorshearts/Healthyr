import React from 'react';

import FlexContainer from '../../../../common/components/flex-container'

import Panel from '../../../../common/components/panel'

import Text from '../../../../common/inputs/text'

import Button from '../../../../common/inputs/button'
import HealthyrApi from '../../../../common/api.jsx';
import Loading from '../../../../common/components/loading'
import Ad from '../../../../common/components/ad'

import TestObject from '../../../../common/components/test-object'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faCircleCheck, faAngleDown} from '@fortawesome/free-solid-svg-icons'




export default class TestResults extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
         email: '',
         kits: [],
         loading: true
        }
        this.handleGetKits = this.handleGetKits.bind(this);

   }

   handleGetKits(customerID){ 
         HealthyrApi.User.getKit({
            platform_user_id: customerID,
         }, success => {
            this.setState({
               kits: success.data.kits.reverse(),
               loading: false
            })
         }, fail => {
            this.setState({
               kits: [],
               loading: false
            })
         })
   }

   componentDidMount(){
     // this.handleGetKits(window.ShopifyAnalytics.meta.page.customerId)
   }





    
   render() {
      return (
         <React.Fragment>
            <div style={{display: 'flex', flexDirection: 'column'}}>
               <Loading loading={(this.state.loading) ? this.state.loading : false}>
                  <div>
                     <div>
                        {this.state.kits.length > 0 ? this.state.kits.map((testObject) => {
                           
                              return(
                                 <TestObject
                                    test={testObject}
                                 />
                             )     
                        }) : null
                        }
                     </div>
                  </div>
               </Loading>
            </div>
            <Ad showSection={false}/>
         </React.Fragment>
      )
   }
}
 
const ICONS = {
   'Results': faCircleCheck,
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
      width: '100%'
   },
   outerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '1px 1px 5px 0px #e7e4e9',
      marginBottom: '20px'
   },
   testInfo: {
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
      justifyContent: 'space-between'
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
   }
}