import React from 'react'
import { createRoot } from 'react-dom/client'
import Brand from '../../brand'


const SIDE_PANEL_STACK = [];


export default class SidePanel {
  static push(title, children) {
    let el = document.createElement("div");
    document.body.appendChild(el);

    let root = createRoot(el)
  
    let reference = null;

    let index = SIDE_PANEL_STACK.length;
    let handleClose = () => {

      SIDE_PANEL_STACK.forEach((x, i) => {
        if (x == reference || i > index) SIDE_PANEL_STACK.splice(i, 1);
      })
      document.body.removeChild(el);
    }

    let handleCloseStart = () => {
      while(SIDE_PANEL_STACK.length > (index + 1)) this.pop();
    }

    let width = Math.min(window.innerWidth, 1000) - (SIDE_PANEL_STACK.length * 50);
    width = Math.max(Math.min(window.innerWidth, 600), width);
    
    root.render(
      <SidePanelComponent 
        width={`${width}px`}
        title={title}
        ref={e => {
          reference = e;
          SIDE_PANEL_STACK.push(e)
        }} 
        onCloseStart={handleCloseStart}
        onClose={handleClose}>
        {children}
      </SidePanelComponent>
    )  
  }

  static pop() {
    let sidePanelInstance = SIDE_PANEL_STACK.pop();
    if (sidePanelInstance) sidePanelInstance.handleClose();
  }

  static pushStart(title, children, index = 0) {
    while(SIDE_PANEL_STACK.length > index) this.pop();
    this.push(title, children);
  }
}

class SidePanelComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      width: '0px'
    }

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({width: this.props.width}), 1)
  }

  handleClose() {
    this.setState({width: '0px'}, () => {
      this.props.onCloseStart();
      setTimeout(() => this.props.onClose(), 300);
    })
  }

  render() {

    let containerStyles = {...STYLES.container, width: this.state.width}
    let subContainer = {...STYLES.subContainer, width: this.props.width}

    return (
      <div style={containerStyles}>
        <div style={subContainer}>
          <div style={STYLES.iconFilter}>
            <i className='fa fa-angle-right' style={STYLES.icon} onClick={this.handleClose}/>
            <span style={STYLES.spantitle}>{this.props.title}</span>
          </div>
          <div style={STYLES.contentContainer}>
            {this.props.children}
          </div>              
        </div>
      </div>
    )
  }
}

const STYLES = {
  subContainer: {
    height: '100%'
  },
  container: {
    position: 'fixed',
    top: '0px',
    bottom: '0px',
    right: '0px',
    background: '#FFFFFF',
    transition: '.3s', 
    overflowX: 'hidden',
    boxShadow: '5px 5px 10px 2px rgba(0,0,0,.8)'
  },
  iconFilter: {
    padding: '15px',
    color: Brand.getActiveColor(),
    border: 'none',
    boxShadow: 'none',
    fontSize: '40px'
  },
  spantitle: {
     padding: '15px',
     fontSize: '40px',
     fontFamily: 'poppins'
  },
  text: {
    border: '2px solid transparent',
    backgroundColor: Brand.getBackgroundColor(),
    color:'black',
    outline: 'none',
    borderRadius: '10px',
    margin: '10px',
    width: '200px',
    height: '100px',
    position: 'fixed'
  },
  contentContainer: {
    padding: '20px'
  },
  icon: {
    cursor: 'pointer'
  }
  
}
