import React from 'react'
import { createRoot } from 'react-dom/client'
import Portal from '../../common/portal/index'
import ContentDashboard from './content/dashboard'
import ContentTests from './content/tests'
import ContentAnalytes from './content/analytes'
import ContentSettings from './content/settings'
import ContentAdvertisements from './content/advertisement'

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
  },
  {
    title: 'Analytes',
    icon: 'fa fa-thermometer-full',
    component: ContentAnalytes,
    link: '/analytes', 
  },
  {
    title: 'Advertisement',
    icon: 'fa fa-newspaper-o',
    component: ContentAdvertisements,
    link: '/advertisements', 
  },
  {
    title: 'Settings',
    icon: 'fa fa-gears',
    component: ContentSettings,
    link: '/settings',
  },
]

class App extends React.Component {
  render() {
    return <Portal prefix="/admin" menus={MENUS} />
  }
}

let root = createRoot(document.getElementById('healthyr'))
root.render(<App />)