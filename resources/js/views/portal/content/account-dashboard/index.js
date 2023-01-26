import React from 'react';

import Link from '../../../../common/components/link'

import FlexContainer from '../../../../common/components/flex-container'

import Section from '../../../../common/components/section'

import Panel from '../../../../common/components/panel'

import Ad from '../../../../common/components/ad'

import RegisterModal from '../../../../common/components/register-modal'
import Loading from '../../../../common/components/loading'


import Text from '../../../../common/inputs/text'

import Button from '../../../../common/inputs/button'
import HealthyrApi from '../../../../common/api.jsx';
import TestObject from '../../../../common/components/test-object'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowTrendDown, faArrowTrendUp, faTruck, faCircleCheck, faMinus} from '@fortawesome/free-solid-svg-icons'

/*
const customerQuery = gql`
  customer(customerAccessToken:"..."){
    id
  }
`;
*/

export default class AccountDashboard extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
         activeRegister: false,
         kits: [],
         loading: true
      }
      this.handleRegisterOpen = this.handleRegisterOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleGetKits = this.handleGetKits.bind(this);
   }

   handleRegisterOpen(){
      document.body.style.overflow = 'hidden';
      this.setState({activeRegister: true})
   }

   handleClose(){
      document.body.style.overflow = null;
      this.setState({activeRegister: false, loading: true})
      this.handleGetKits(window.ShopifyAnalytics.meta.page.customerId)
   }

   handleGetKits(customerID){ 
         HealthyrApi.User.getKit({
            platform_user_id: customerID,
         }, success => {
            this.setState({
               kits: success.data.kits,
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
    let params = new URLSearchParams(window.location.search)
    if(params.get('kit_id') != null){
        localStorage.setItem("kit_id", params.get('kit_id'));
    }
      let kitID = localStorage.getItem('kit_id')
      if(kitID != 'null' && kitID != null){
          this.setState({
            activeRegister: true
          })
      }
      this.handleGetKits(window.ShopifyAnalytics.meta.page.customerId)
      let headerButton = document.getElementById('header-register-test')
      if(headerButton){
         headerButton.addEventListener('click', (e) => {

            e.stopPropagation()
            this.setState({activeRegister: true})
         }, true)
         headerButton.removeAttribute('href')
         headerButton.style.cursor = 'pointer'
      }
   }
    
   render() {
      let last3 = (this.state.kits.length > 0) ? ((this.state.kits.length > 2) ? this.state.kits.slice(-3) : this.state.kits).reverse() : []
      return (
         <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>

               <Section style={{marginTop: '0px'}}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                     <div style={{minWidth: '250px', flex: '1', textAlign: (window.innerWidth > 1200) ? 'left' : 'center'}}>
                        {
                           last3.length > 0 ? 
                              <div style={{fontSize: '18px', fontWeight: '700'}}>
                                 Want to take another test?
                              </div>
                           :  <Info header={'You have no recent tests'} data={'Order or register a test to get started.'}/>
                        }
                     </div>
                     <div style={STYLES.buttonContainer}>
                           <Button
                             color={'#130168'}
                             stylesbutton={{fontSize: '16px', border: '0px solid transparent', maxWidth: '200px'}}
                             props={{onClick: e => window.open('/collections/general-wellness')}}
                           >
                              Purchase a Test
                           </Button>
                        <Button
                          color={'#130168'}
                          invert={true}
                          stylesbutton={{fontSize: '16px', maxWidth: '200px'}}
                          props={{onClick: this.handleRegisterOpen}}
                        >
                           Register a Test
                        </Button>
                     </div>
                  </div>
               </Section>

               <Section title={'My tests'}>
                  {this.state.kits.length > 0 ? 
                     <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px'}}>
                        <div style={{fontWeight: 700, fontSize: '18px'}}>
                           Recent Tests
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                           <div onClick={e=> window.location.replace('/pages/account-my-tests?show=account')} style={{marginRight: '15px', fontSize: '14px', fontWeight: 700, cursor: 'pointer'}}>
                              View all Tests
                           </div>
                           <FontAwesomeIcon icon={faAngleRight}/>
                        </div>
                     </div>

                  : null
                  }
                  <div>
                     <Loading loading={(this.state.loading) ? this.state.loading : false}>
                        {last3.length > 0 ? (last3).map((testObject) => {
                           
                           return(
                              <TestObject
                                 test={testObject}
                                 side={true}
                              />
                          )
                       
                        }) : null
                     }
                     </Loading>
                  </div>
               </Section>
               {/*
               <Section title={'My health trends'}>
                  {TRENDS.length > 0 ? 

                     <div style={STYLES.trendsBox}>
                        {
                           TRENDS.map((trendObject) => {
                              return(
                                 <TrendObject
                                    trend={trendObject}
                                 />
                              )
                           })
                        }
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', cursor: 'pointer'}}>
                           <div style={{fontWeight: '700', fontSize: '14', marginRight: '10px'}}>
                              View all trends
                           </div>
                           <FontAwesomeIcon icon={faAngleRight}/>
                        </div>
                     </div>

                  :

                  <Info header={'No trends to display'} data={'Take a test to begin tracking your health'}/>
                  }
               </Section>*/}
               <Ad showSection={true}/>
            </div>
            {
                    this.state.activeRegister ?
                    <RegisterModal
                        width={'480px'}
                        handleClose={this.handleClose}


                    />
                    : null
                }
         </div>
      )
   }
}


const Info = (props =>{
   return(
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
         <div style={{fontWeight: '700', fontSize: '18px', marginRight: '10px', textAlign: (window.innerWidth > 1200) ? 'left' : 'center'}}>
            {props.header}
         </div>
         <div style={{textAlign: (window.innerWidth > 1200) ? 'left' : 'center'}}>
            {props.data}
         </div>
      </div>
   )
})


const TrendObject = (props =>{
   return(
      <div style={STYLES.trendContainer}>
         {props.trend.new ?
            <div style={STYLES.trendBubble}>
               NEW TREND
            </div>
            : null
         }
         <Panel style={{background: '#F7F7F7'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
               <div style={{fontSize: '14px', fontWeight: '700', color: '#000000'}}>
                  {props.trend.trendTitle}
               </div>
               <div style={{fontSize: '40px', fontWeight: '700', color: FONT_COLOR[props.trend.status]}}>
                  {props.trend.data}
               </div>
               {(props.trend.trendDirection != '' && props.trend.trendAmount != '') ?
                  <div style={{fontSize: '12px', fontWeight: '', display: 'flex', color: FONT_COLOR[props.trend.status]}}>
                     <div style={{marginRight: '6px'}}>
                        <FontAwesomeIcon icon={TREND_ICONS[props.trend.trendDirection]}/>
                     </div>
                     {props.trend.trendDirection} {props.trend.trendAmount}
                  </div>
                  :
                  <FontAwesomeIcon icon={faMinus}/>
               }
               <div style={{fontSize: '13px', color: '#000000', paddingTop: '5px', marginTop: '5px', borderTop: '1px solid', width: '100%'}}>
                  {props.trend.trendDate}
               </div>
            </div>
         </Panel>
      </div>
   )
})

/*

const TestObject = (props =>{
   return(
      <div style={STYLES.testContainer}>
         <div style={STYLES.testInfo}>
            <div>
               {props.test.orderDate}
            </div>
            <div style={{fontSize: '16px', fontWeight: '700'}}>
               {props.test.orderTitle}
            </div>
            <div>
               {props.test.bioMarkers} biomarkers tested
            </div>
         </div>
         <div style={STYLES.testStatus}>
            <FontAwesomeIcon icon={ICONS[props.test.status]} size={'1.8x'}/>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '80px'}}>
               <div>
                  {props.test.status == 'Results' ? 'Results' : 'Status'}
               </div>
               <div style={{fontSize: '16px', fontWeight: '700'}}>
                  {props.test.status == 'Results' ? props.test.results : props.test.status}
               </div>
               <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div  style={{marginRight: '10px'}}>
                     {props.test.deliveryDate}
                  </div>
                  <div>
                     {props.test.deliveryTime}
                  </div>
               </div>
            </div>
            <div onClick={e=> window.open('/pages/account-my-tests?show=account')} style={{cursor: 'pointer', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
               <FontAwesomeIcon icon={faAngleRight}/>
            </div>
         </div>
      </div>
   )
})
*/
const DeliveredTestObject = (props =>{
   return(
      <div style={STYLES.testContainer}>
         <div style={STYLES.testInfo}>
            <div>
               {props.test.orderDate}
            </div>
            <div style={{fontSize: '16px', fontWeight: '700'}}>
               {props.test.orderTitle}
            </div>
            <div>
               {props.test.bioMarkers} biomarkers tested
            </div>
         </div>
         <div style={STYLES.testStatus}>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '80px'}}>
               <div style={{fontSize: '16px', fontWeight: '700'}}>
                  {props.test.status}
               </div>
               <div>
                  {props.test.deliveryDate}
               </div>
               <div>
                  {props.test.deliveryTime}
               </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
               <div style={{fontSize: '16px', fontWeight: '700', marginRight: '20px'}} onClick={props.onRegisterOpen}>Register Test</div>
               <FontAwesomeIcon icon={faAngleRight}/>
            </div>
         </div>
      </div>
   )
})

const RECENT_TESTS = [
   {
      orderTitle: 'Athletic Performance Screening',
      orderDate: '08/20/2022',
      bioMarkers: '8',
      status: 'Delivered',
      deliveryDate: '08/22/2022',
      deliveryTime: '11:45 PM MDT',
      results: '',
   },
   {
      orderTitle: 'Comprehensive Health Screening',
      orderDate: '08/20/2022',
      bioMarkers: '12',
      status: 'Out for Delivery',
      deliveryDate: '08/22/2022',
      deliveryTime: '11:45 PM MDT',
      results: '',
   },
   {
      orderTitle: 'Prediabetes Health Screening',
      orderDate: '08/20/2022',
      bioMarkers: '6',
      status: 'Results',
      deliveryDate: '08/14/2022',
      deliveryTime: '11:45 PM MDT',
      results: 'Low risk of diabetes'
   }
]

const TRENDS = [
   {
      trendTitle: 'Total Cholesterol',
      trendDate: '07/22/2022',
      data: '183 mg',
      trendDirection: 'Down',
      trendAmount: '4.8 mg',
      new: true,
      status: 'Good'
   },
   {
      trendTitle: 'Total Lipids',
      trendDate: '07/22/2022',
      data: '118 mg',
      trendDirection: 'Up',
      trendAmount: '4.8 mg',
      new: true,
      status: 'Bad'
   },
   {
      trendTitle: 'Glucose level',
      trendDate: '04/13/2022',
      data: '121 mg',
      trendDirection: '',
      trendAmount: '',
      new: false
   },
]

const ICONS = {
   'Out for Delivery': faTruck,
   'Results': faCircleCheck,
}

const TREND_ICONS = {
   'Up': faArrowTrendUp,
   'Down': faArrowTrendDown,
   '': faMinus,
}

const FONT_COLOR = {
   'Good': '#146C2E',
   'Bad' : '#FF6668'
}

const STYLES = {
   title: {
      fontSize: '20px',
   },
   adTitle: {
      fontWeight: '700',
      fontSize: '18px',
      marginRight: '10px',
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
      marginBottom: '10px',
      flex: '1',
      minWidth: '300px',
   },
   adLink: {
      textDecoration: 'underline',
      cursor: 'pointer'
   },
   buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
      flex: '1'
   },
   testContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      backgroundColor: '#F2F2F2',
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