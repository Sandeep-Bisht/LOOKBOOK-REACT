// ** Icon imports
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Bookmark from 'mdi-material-ui/Bookmark'

import Settings from 'mdi-material-ui/light/Settings'
import { Application } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/management/dashboard'
    },
    {
      sectionTitle: 'Configuration'
    },
    {
      title: 'Services',
      icon: Settings,
      path: '/management/services'
    },
    {
      title: 'Products',
      icon: CubeOutline,
      path: '/management/products'
    },
    {
      title: 'Blog',
      icon: Bookmark,
      path: '/management/blogs'
    },
    {
      title: 'Requests',
      icon: Application,
      path: '/management/artists-request'
    },
  ]
}

export default navigation
