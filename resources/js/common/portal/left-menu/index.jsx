import React from 'react';


import MenuItem from './menu-item';

import CommonBrand from '../../brand';

import CommonApiAuth from '../../api/auth';

const MENU_LOGOUT = {
    title: 'Logout',
    icon: 'fa fa-sign-out',
    method: () => {
        CommonApiAuth.Authenticate.logout();
        window.location = '/';
    }
}

const LeftMenu = (props) => {
    // create menus
    let menus = props.menus.map((x, i) => {
        if (x.viewOnly) return null;
        return (x.showMethod && !x.showMethod(props.user)) ? null : <MenuItem
            key={i}
            menu={x}
            prefix={props.prefix}
            onClose={props.onClose}
        />
    });

    let logoStyles = { ...STYLES.logo };
    if (props.onClose) logoStyles.maxWidth = '180px';

    return (
        <div style={STYLES.container}>
            {
                props.onClose ?
                    <i className='fa fa-close' style={STYLES.closeIcon} onClick={props.onClose} /> : null
            }
            <img style={logoStyles} src={CommonBrand.getLogoDarkUrl()} />
            <div style={STYLES.menusContainer}>
                {menus}
                {/* Spacer */}
                <div style={STYLES.flexSpacer}></div>
                <MenuItem
                    menu={MENU_LOGOUT}
                    prefix={props.prefix}
                />
            </div>
            <div style={STYLES.copyright}>&copy;{(new Date()).getFullYear()} All Rights Reserved</div>
        </div>
    )
}

export default LeftMenu;


const STYLES = {
    flexSpacer: {
        flex: 1
    },
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '0px',
        minWidth: '250px',
        overflowY: 'hidden',
        backgroundColor: 'white',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '20px',
        boxShadow: '-1px 0px 29px rgba(180, 204, 222, 0.13)'
    },
    logo: {
        maxHeight: '120px',
        maxWidth: '225px',
    },
    mainMenu: {
        fontFamily: 'poppins',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#96A0AF',
        marginBottom: '20px',
        marginTop: '20px',
        paddingLeft: '15px'
    },
    copyright: {
        padding: '30px',
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '14px',
        color: '#96A0AF',
    },
    menusContainer: {
        flex: 1,
        overflow: 'auto',
        marginRight: '-30px',
        paddingRight: '30px',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column'
    },
    closeIcon: {
        fontSize: '40px',
        position: 'absolute',
        top: '20px',
        right: '40px'
    }
}