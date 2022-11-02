
import React from 'react';
import { createRoot } from 'react-dom/client';
import Portal from '../../common/portal/index';

import ContentDashboard from './content/dashboard';
import ContentOrders from './content/orders';
import ContentShipments from './content/shipments';
import ContentSettings from './content/settings';

const MENUS = [
    {
        title: 'Dashboard',
        icon: 'fa fa-dashboard',
        component: ContentDashboard,
        link: '/',
        default: true
    },
    {
        title: 'Orders',
        icon: 'fa fa-tags',
        component: ContentOrders,
        link: '/orders',
    },
    {
        title: 'Shipments',
        icon: 'fa fa-truck',
        component: ContentShipments,
        link: '/shipments',
    },
    {
        title: 'Settings',
        icon: 'fa fa-gears',
        component: ContentSettings,
        link: '/settings'
    }
]

class App extends React.Component {
    render() {
        return (
            <Portal
                prefix='/brand'
                menus={MENUS}
            />
        )
    }
}

let root = createRoot(document.getElementById('healthyr'));
root.render(<App />);