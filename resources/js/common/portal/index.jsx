import InitializePrototypes from "../../common/prototypes";
InitializePrototypes();

import Brand from '../../common/brand';
import Storage from '../../common/storage';

window.Brand = new Brand();
document.documentElement.style.setProperty(`--primaryColor`, Brand.getPrimaryColor());

// portal component
import React from 'react';
import { Router, Route } from "react-router-dom";

import ActiveView from './active-view';

import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

import ActiveModal from './modal/active';

import LeftMenu from './left-menu/index';
import LeftMenuMobile from './left-menu/mobile';

import ComponentResponsive from '../components/responsive';


export default class Portal extends React.Component {

    constructor(props) {

        super(props)

        // creat state with user
        this.state = {
            //user: undefined
        }

    }

    componentDidMount() {
        // load user to the state
        /*this.subscribeUser = window.GoaUser.subscribe(user => {
            this.setState({ user: user })
        })
        window.GoaUser.loadUser(() => {
            window.location = '/';
        })*/
    }

    handleLogoutOfSubUser() {
        Storage.remove('goa-loginasuser-tokens');
        window.location = '/admin';
    }


    componentWillUnmount() {

        // unsubscribe user loading when we unmount 
        window.GoaUser.unsubscribe(this.subscribeUser);

    }

    render() {

        // check user if not set yet return null
        //if (!this.state.user) return null;

        // create routes
        let routes = this.props.menus.map((x, i) => {
            if (!x.component) return null;
            let Component = x.component;
            return <Route
                key={i}
                exact path={this.props.prefix + x.link}
                render={props => <Component  {...props} />}
            />
        })

        // include logout of user
        let showLogoutOfSubuser = Storage.has('goa-loginasuser-tokens');

        // return portal view
        return (
            <div style={STYLES.body}>
                {/*
                    showLogoutOfSubuser ?
                        <div
                            style={STYLES.logoutOfUserContainer}
                            onClick={this.handleLogoutOfSubUser}
                        >
                            <a style={STYLES.logoutOfUserText} href='#'>You are logged in as {this.state.user.name}! Logout</a>
                        </div> : null
        */}
                <Router ref={e => this.router = e} history={history}>


                    <ComponentResponsive max={900}>
                        <LeftMenuMobile
                            prefix={this.props.prefix}
                            menus={this.props.menus}
                            user={this.state.user}
                        />
                    </ComponentResponsive>
                    <div style={STYLES.container}>

                        {/* Side Menu */}
                        <ComponentResponsive min={900}>
                            <LeftMenu
                                prefix={this.props.prefix}
                                menus={this.props.menus}
                                user={this.state.user}
                            />
                        </ComponentResponsive>


                        <div style={STYLES.contentContainer}>
                            {/*} <Header user={this.state.user} prefix={this.props.prefix} />*/}

                            <div style={STYLES.dynamicContainer}>
                                {/* content section */}
                                <div style={STYLES.routeContainer}>

                                    {routes}
                                    {/*<Route exact path={this.props.prefix + '/profile'}>
                                        <ContentProfile user={this.state.user} />
                                    </Route>*/}
                                </div>

                                {/* active model display*/}
                                <ActiveView stateKey='active-model' />
                            </div>
                        </div>

                        <ActiveModal stateKey='active-modal' />

                    </div>
                </Router>
            </div>
        )
    }
}



const STYLES = {
    body: {
        overflow: 'hidden',
        flex: '1',
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
    },
    menuContainer: {
        width: '150px'
    },
    container: {
        flex: '1',
        overflow: 'hidden',
        minHeight: '0px',
        display: 'flex',
        fontFamily: 'poppins',
        background: Brand.getBackgroundColor()
    },
    menuPanel: {
        borderRadius: '0px 20px 20px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    routeContainer: {
        marginTop: '20px',
        borderRadius: '20px',
        flex: 1,
        paddingRight: '40px',
        marginLeft: '20px',
        overflow: 'overlay',
        maxHeight: '100%',
        paddingBottom: '20px',
        marginRight: '-21px',
        width: '1px'
    },
    logoutOfUserContainer: {
        width: '100%',
        background: Brand.getPrimaryColor(),
        padding: '20px',
        textAlign: 'center'
    },
    logoutOfUserText: {
        color: 'white',
        fontSize: '20px'
    },
    contentContainer: {
        flex: '1'
    },
    dynamicContainer: {

        flex: '1',
        overflow: 'hidden',
        minHeight: '0px',
        display: 'flex',
        height: '100%'
    }
}