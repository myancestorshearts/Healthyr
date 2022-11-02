import React from 'react';

import PortalTitle from '../../../common/portal/title';

import FlexContainer from '../../../common/components/flex-container';

import CommonBrand from '../../../common/brand';


export default class Settings extends React.Component {


    render() {
        return (
            <FlexContainer gap='20px'>

                <PortalTitle title='Settings' />


            </FlexContainer>
        )
    }
}