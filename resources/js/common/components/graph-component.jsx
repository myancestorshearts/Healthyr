import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboardCheck} from '@fortawesome/free-solid-svg-icons'
import Dictionary from '../dictionary'

//buttonText=Button Text
//buttonOnClick= On Click Function
//buttonStyles= Button Styles

const GraphComponent = (props) => {
        let initArray = []
        initArray[0] = (props.result.report_min != null ? '#' : '-')
        initArray[1] = (props.result.low_min != null ? '#' : '-')
        initArray[2] = (props.result.healthy_min != null ? '#' : '-')
        initArray[3] = (props.result.healthy_max != null ? '#' : '-')
        initArray[4] = (props.result.high_max != null ? '#' : '-')
        initArray[5] = (props.result.report_max != null ? '#' : '-')
        let finalArray = Dictionary.RESULT_DESCRIPTIONS[initArray.join('')]
        return(
            <div style={{width: '100%', display: 'flex', flexDirection:'row', height: '4px', marginTop: '20px'}}>
                {finalArray.map((GraphBox) => {
                         
                            return(
                               <GraphBoxComponent
                                  graphBox={GraphBox}
                                  result={props.result}
                                  lengthFinal={finalArray.length}
                               />
                           )     
                      })}
            </div>
        )
}

const GraphBoxComponent = (props) => {
        let newMin = props.result[props.graphBox.min]
        let newMax = props.result[props.graphBox.max]
        let newValue = (props.graphBox.show ? (props.graphBox.position == 'left' ? newMin : newMax) : '')
        let positionStyles = {position: 'absolute', top: '10px'}
        let positionStylesAddition = ((props.graphBox.position == 'left' ? {left: '-10px'} : {right: '-20px'}))
        let newResult = props.result.result
        let additionalChar = ''
        if((newResult.toString()).includes(">")){
            newResult = parseFloat(newResult.replace(">", ''))
            additionalChar = ">"
        } else if ((newResult.toString()).includes("<")){
            newResult = parseFloat(newResult.replace("<", ''))
            additionalChar = "<"
        }

        return(
            <div style={{'flex': (props.graphBox.flex), backgroundColor: props.graphBox.color, height: '100%', position: 'relative'}}>
                <div/>
                {props.graphBox.show ?
                    <div style={{...positionStyles, ...positionStylesAddition}}>
                            {newValue}
                    </div>
                    : null
                }
                {/*
                {graphBox.min.show ?
                    <div style={{position: 'absolute', left: '-10px',  top: '10px'}}>
                            {graphBox.min}
                    </div>
                    : null
                }
                {graphBox.last  && graphBox.max.show ?

                    <div style={{position: 'absolute', right: '-20px', top: '10px'}}>
                        {graphBox.max}
                    </div>

                    : null

                }*/}
                {((newResult >= newMin) && (newResult <= newMax)) ?
                    <div style={{position: 'absolute', top: '-12px', zIndex: '8', backgroundColor: '#ffffff', left: (((newResult - newMin)/(newMax - newMin) * 100) + '%' )}}>
                        <div style={{position: 'absolute', top: '-20px', whiteSpace: 'nowrap', left: ((props.result.unit_of_measure == '%') ? '-7px' : '-28px')}}>
                            {additionalChar + newResult + ' ' + props.result.unit_of_measure}
                        </div>
                        <FontAwesomeIcon icon={faClipboardCheck}/>
                    </div>

                    : null

                }
            </div>
        )
}



export default GraphComponent;

const STYLES = {
    container: {
        background: 'white',
        padding: '20px',
        boxShadow: '2px 2px 5px #e7e4e9'
    },
}
