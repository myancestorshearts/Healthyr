import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Button from '../inputs/button'
export default class Accordion extends React.Component{

  constructor(props)
  {
    super(props)
    this.state = {
        extend: this.props.extend ? this.props.extend : false
    }

  }

  

  render() {

    return(
        <div style={STYLES.outerContainer}>
            <div style={STYLES.innerContainer}>
                <div style={STYLES.title}>
                    {this.props.title}
                </div>
                <div style={STYLES.chevronContainer} onClick={() => this.setState({ extend: (!this.state.extend) })}>
                    <FontAwesomeIcon icon={(this.state.extend) ? faAngleDown : faAngleUp}/>
                </div>
            </div>
            {this.state.extend ?
                    <div>
                        <div style={STYLES.imageContainer}>
                            {this.props.image ? 
                                <img 
                                    style={{width:'100%', objectFit: 'cover', height: '160px', marginTop: '10px'}} 
                                    src={this.props.image}
                                />

                            : null
                            }
                        </div>
                        <div style={STYLES.text}>
                            {this.props.text}
                        </div>
                        <Button
                            color={'#130168'}
                            stylesbutton={STYLES.buttonContainer}
                            props={{onClick: () => {window.location.replace(this.props.url)}}}
                            invert={true}
                            tagName={'div'}
                        >
                            {this.props.buttonText}
                        </Button>
                    </div>
                    :null
                }
        </div>
    )
  }
}


const STYLES = {
    outerContainer: {
        borderBottom: '1px solid #BDBDBD'
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: '16px',
        fontWeight: '700'
    },
    buttonText: {

    },
    chevronContainer: {

    },
    imageContainer: {

    },
    buttonContainer: {
        marginTop: '20px',
        padding: '20px',
        borderRadius: '4px',
        fontSize: '14px', 
        width: 'auto'
    },
    text: {
         fontSize: '14px'
    }
}