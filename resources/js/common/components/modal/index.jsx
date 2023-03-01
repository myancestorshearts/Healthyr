import React from 'react';

import ReactDOM from "react-dom"

import FlexContainer from '../flex-container'

import Panel from '../../components/panel'

import Text from '../../../common/inputs/text'
import CommonBrand from '../../brand'
import Button from '../../../common/inputs/button'
import Spacer from '../../../common/components/spacer'

export default class Modal extends React.Component {
    constructor(props)
    {
        super(props);

        this.panelRef = React.createRef();
        this.el = document.createElement('div');
        this.el.style['z-index'] = 10;
        this.el.style.position = 'Fixed';
        this.el.style.inset = '0px';
        this.el.style.background = 'rgba(0, 0, 0, .5)';
        this.el.style.display = 'flex';
        this.el.style['align-items'] = 'center';
        this.el.style['justify-content'] = 'center';

        document.body.appendChild(this.el);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.body.removeChild(this.el);
    }

    handleClickOutside(event) {
        if (this.props.onClickOutside && this.panelRef && !this.panelRef.contains(event.target)) {
            this.props.onClickOutside();
        }
    }

    render() {
        let panelStyles = {...STYLES.panelStyle, ...{maxHeight: this.props.maxHeight ? this.props.maxHeight : null, width: this.props.width ? this.props.width : null, minWidth: this.props.width ? null : '15%', 
        height: this.props.height, 
        overflow: 'hidden' }}
        return ReactDOM.createPortal(
            <React.Fragment>
                <Panel className={this.props.className} style={panelStyles}>
                    <div ref={e => this.panelRef = e} >
                        {this.props.children}
                    </div>
                </Panel>
            </React.Fragment>
        , this.el);
    }

}


const STYLES = {
    panelStyle: {
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        fontSize: '25px',
        padding: '50px',
        overflow: 'hidden',
        background: 'white'
    },
    confirmButtonsContainer: {
        display: 'flex',
        
    }, 
    
}


export const CONFIRM = (message, successCallback, cancelCallback) => {
    
   var el = document.createElement('div');
   document.body.appendChild(el);
    el.focus();
   let onSuccess = () => {
      if (successCallback) successCallback();
      ReactDOM.unmountComponentAtNode(el);
      document.body.removeChild(el);
   }

   let onCancel = () => {
      if (cancelCallback) cancelCallback(el);
      ReactDOM.unmountComponentAtNode(el);
      document.body.removeChild(el);
   }

   ReactDOM.render(<Modal>
        {message}
        <Spacer space='10px'/>
        <div style={STYLES.confirmButtonsContainer}>
            <Button 
                props={{
                    autoFocus: true,
                    onClick:onSuccess
                }}
                color={CommonBrand.getPrimaryColor()}
               
            >
                Confirm
            </Button>
            <Spacer space='20px'/>
            <Button 
                color={CommonBrand.getPrimaryColor()}
                props={{onClick:onCancel}}
            >
                Cancel
            </Button>
        </div>
    </Modal>, el);
}