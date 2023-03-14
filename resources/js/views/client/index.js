import React from 'react'
import { createRoot } from 'react-dom/client'
import Portal from '../../common/portal/index'
import ContentDashboard from './content/account-dashboard'
import ContentTests from './content/test-results'
import Storage from '../../common/storage';
import ContentTestInstructions from './content/testing-insrtuctions'
import ContentOrders from './content/orders'
import ContentPartners from './content/partners'
import ContentProfile from './content/profile/profile'

class App extends React.Component {
	render() {
		let MENUS = [
			{
				title: 'Dashboard',
				icon: 'fa-solid fa-house-medical',
				component: ContentDashboard,
				link: '/',
				default: true,
			},
			{
				title: 'My Tests',
				icon: 'fa-solid fa-microscope',
				component: ContentTests,
				link: '/tests',
			},
			{
				title: 'Orders',
				icon:'fa-solid fa-truck-medical',
				component: ContentOrders,
				link: '/orders'
		    },
		    {
				title: 'Our Partners',
				icon:'fa-solid fa-handshake-angle',
				component: ContentPartners,
				link: '/partners'
			},
			{
				title: 'Profile',
				icon:'fa-solid fa-user',
				component: ContentProfile,
				link: '/profile'
			},
			{
				title: 'Testing Instructions',
				icon:'fa fa-tint',
				component: ContentTestInstructions,
				link: '/settings',
                dropped: true
			}
		]

		let user = Storage.get('healthyr-user')

		if(user.admin == '1'){
			MENUS.push({
				title: 'Admin',
				icon: 'fa fa-lock',
				method: () => {
					window.location = '/admin'
				},
				exact: true,
                dropped: true
			})
		}

		return <Portal prefix="/client" menus={MENUS}/>
	}
}

let root = createRoot(document.getElementById('healthyr'))
root.render(<App />)