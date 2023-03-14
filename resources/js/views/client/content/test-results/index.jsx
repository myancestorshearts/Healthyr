import React from 'react';
import TestResults from './test-card';
import Title from '../../../../common/portal/title';
import Spacer from '../../../../common/components/spacer';

export default class TestView extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
        }
    
   }




    
   render() {
    console.log(this.props, 'ITS A PROP')
      return (
         <div>
             <Title 
              title='My Tests'
              />
              <Spacer />
               <TestResults
                user={this.props.user}
               />
         </div>
      )
   }
}
