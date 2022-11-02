import React from 'react';
import { createRoot } from 'react-dom/client';

import CommonBrand from '../../common/brand';

import Register from './content/register';
import Login from './content/login';
import Forgot from './content/forgot';
import Set from './content/set';
import Verify from './content/verify';
import ThankYou from './content/thank-you';
import ShopifySet from './content/shopify-set'


import ComponentFlexContainer from '../../common/components/flex-container';
import ComponentResponsive from '../../common/components/responsive';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class LoginView extends React.Component {

    render() {

        return (
            <Router ref={e => this.router = e}>
                <ComponentFlexContainer gap='0px'>

                    {/* Image */}
                    <ComponentResponsive min={900}>
                        <div style={STYLES.containerImage}>
                        </div>
                    </ComponentResponsive>
                    {/* Authenticat Content */}
                    <ComponentFlexContainer
                        gap='20px'
                        direction='column'
                        center={true}
                        style={STYLES.containerAuthenticate}
                    >
                        {/*Logo*/}
                        <img style={STYLES.logo} src={CommonBrand.getLogoDarkUrl()} />

                        <div style={STYLES.innerContainer}>
                            <Switch>
                                <Route path='/' exact component={Login} />
                                <Route path='/register' component={Register} />
                                <Route path='/forgot' component={Forgot} />
                                <Route path='/set' component={Set} />
                                <Route path='/verify' component={Verify} />
                                <Route path='/thank-you' component={ThankYou} />
                                <Route path='/shopify-set' component={ShopifySet} />
                            </Switch>
                        </div>
                    </ComponentFlexContainer>

                    {/* Image */}
                    <ComponentResponsive min={900}>
                        <div style={STYLES.containerImage}>
                        </div>
                    </ComponentResponsive>
                </ComponentFlexContainer>

            </Router >
        )
    }
}

const STYLES = {
    containerImage: {
        backgroundImage: 'url("/global/assets/images/branding/gradient-background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerAuthenticate: {
        padding: '10px',
        flex: 2,
        backgroundColor: CommonBrand.getBackgroundColor()
    },
    logo: {
        maxHeight: '100px',
        maxWidth: '100%'
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        marginTop: '-113px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        maxWidth: '560px',
        width: '100%'
    }
}


let root = createRoot(document.getElementById('healthyr'));
root.render(<LoginView />);