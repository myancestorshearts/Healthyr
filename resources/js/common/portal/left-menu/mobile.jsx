import React from 'react';

import CommonBrand from '../../brand';

import FlexContainer from '../../components/flex-container';
import LeftMenu from './index';

export default class LeftMenuMobile extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    render() {

        let maxWidth = this.state.open ? '300px' : '0px';

        let menuStyles = { ...STYLES.menu, maxWidth: maxWidth }


        return (
            <FlexContainer style={STYLES.container} center={true}>
                <i className='fa fa-bars' style={STYLES.icon} onClick={() => this.setState({ open: true })} />
                <img style={STYLES.image} src={CommonBrand.getLogoDarkUrl()}></img>

                {this.state.open ? <div
                    style={STYLES.overlay}
                    onClick={() => this.setState({ open: false })}
                /> : null}
                <div style={menuStyles}>
                    <LeftMenu
                        onClose={() => this.setState({ open: false })}
                        prefix={this.props.prefix}
                        menus={this.props.menus}
                        user={this.props.user}
                    />
                </div>
            </FlexContainer>
        )
    }
}


const STYLES = {
    container: {
        height: '60px',
        position: 'relative',
    },
    image: {
        height: '34px'
    },
    icon: {
        fontSize: '40px',
        left: '20px',
        position: 'absolute',
        cursor: 'pointer'
    },
    menu: {
        position: 'fixed',
        overflowX: 'hidden',
        left: '0px',
        top: '0px',
        bottom: '0px',
        background: 'white',
        display: 'flex',
        transition: '.3s'
    },
    overlay: {
        position: 'fixed',
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
        backgroundColor: 'rgba(80, 80, 80, .8)',
        cursor: 'pointer'
    }
}