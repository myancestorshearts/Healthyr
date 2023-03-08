import React from 'react'
import { createRoot } from 'react-dom/client'
import Portal from '../../common/portal/index'
import ContentDashboard from './content/account-dashboard'
import ContentTests from './content/test-results'
import Storage from '../../common/storage';
import ContentTestInstructions from './content/test-instructions/'




class App extends React.Component {
  render() {

    let MENUS = [
      {
        title: 'Dashboard',
        icon: 'fa fa-home',
        component: ContentDashboard,
        link: '/',
        default: true,
      },
      {
        title: 'My Tests',
        icon: 'fa fa-bar-chart',
        component: ContentTests,
        link: '/tests',
      },
      {
         title: 'Testing Instructions',
         icon:'fa fa-file',
         component: ContentTestInstructions,
         link: '/settings'
      },
      {
        title: 'My Orders',
        icon:'fa fa-cart-plus',
        component: ContentTestInstructions,
        link: '/settings'
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
      })
    }


    return <Portal prefix="/client" menus={MENUS} />
  }
}

let root = createRoot(document.getElementById('healthyr'))
root.render(<App />)