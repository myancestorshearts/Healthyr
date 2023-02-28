import React from 'react'
import { createRoot } from 'react-dom/client'
import Portal from '../../common/portal/index'
import ContentDashboard from './content/account-dashboard'
import ContentTests from './content/test-results'

const MENUS = [
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

class App extends React.Component {
  render() {
    return <Portal prefix="/client" menus={MENUS} />
  }
}

let root = createRoot(document.getElementById('healthyr'))
root.render(<App />)