import React from 'react'
import { createRoot } from 'react-dom/client'
import Portal from '../../common/portal/index'
import ContentDashboard from './content/account-dashboard'
import ContentTests from './content/test-results'
import Storage from '../../common/storage';




class App extends React.Component {
  render() {

    let MENUS = [
      {
        title: 'Dashboard',
        icon: 'fa fa-dashboard',
        component: ContentDashboard,
        link: '/',
        default: true,
      },
      {
        title: 'Tests',
        icon: 'fa fa-flask',
        component: ContentTests,
        link: '/tests',
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