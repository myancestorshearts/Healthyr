import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Brand from '../../brand';
//import { TourMethods } from 'react-shepherd'
import ComponentStyled from '../../components/styled-component';

const MenuItem = (props) => {

    // adds a location hook so component will update when changing location
    useLocation();

    // get link component and link props based on if menu has method or is an actual route
    let linkProps = props.menu.method ? {
        onClick: props.menu.method
    } : {
        to: props.prefix + props.menu.link,
        exact: true
    };

    let LinkComponent = (props.menu.method) ? 'div' : NavLink;

    let isActive =
        (props.prefix + props.menu.link == window.location.pathname) ||
        (props.menu.link == '/' ? props.prefix == window.location.pathname : false)

    return (
        <div onClick={props.onClose}>
            <LinkComponent
                {...linkProps}
                style={STYLES.link}
            >
                <ComponentStyled
                    tagName='div'
                    style={STYLES.container}
                    styleActive={STYLES.containerActive}
                    styleHover={STYLES.containerActive}
                    active={isActive}
                >
                    <i style={STYLES.icon} className={props.menu.icon} />
                    <span>{props.menu.title}</span>
                </ComponentStyled>
            </LinkComponent>
        </div>
    )
}


const STYLES = {
    link: {
        textDecoration: 'none',
    },
    container: {
        height: '67px',
        borderRadius: '20px',
        marginBottom: '5px',
        color: '#7C88A1',
        fontSize: '16px',
        fontWeight: '600',
        fomtFamily: 'poppins',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    },
    containerActive: {
        backgroundColor: Brand.getActiveColor(),
        color: 'white'
    },
    title: {
        textDecoration: 'none',
        color: 'white'
    },
    icon: {
        padding: '20px',
        fontSize: '25px',
        width: '30px',
        textAlign: 'center'
    }
}

export default MenuItem;