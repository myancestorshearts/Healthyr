
import React from 'react';

import CommonBrand from '../../brand';
import PortalPanel from './index';

const PanelTotal = (props) => {
    return (
        <PortalPanel
            style={STYLES.totalPanelContainer}
            headerTitle={props.title}
        >
            <div style={STYLES.totalValue}>{props.value}</div>
        </PortalPanel>
    )
}

export default PanelTotal;

const STYLES = {
    totalPanelContainer: {
        flex: 1,
        minWidth: '300px',
        textAlign: 'center'
    },
    totalValue: {
        fontSize: '50px',
        color: CommonBrand.getSecondaryColor()
    }
}