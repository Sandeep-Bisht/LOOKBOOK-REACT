// ** Icon imports
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Bookmark from 'mdi-material-ui/Bookmark'
import { MdOutlineCategory } from "react-icons/md";

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
      title: 'Sliders',
      icon: Settings,
      path: '/management/sliders'
    },
    {
      title: 'Services',
      icon: Settings,
      path: '/management/services'
    },
    {
      title: 'Brands',
      icon: CubeOutline,
      path: '/management/products'
    },
    {
      title: 'Blogs',
      icon: Bookmark,
      path: '/management/blogs'
    },

    {
      title: 'Categories',
      icon: MdOutlineCategory,
      path: '/management/categories'
    },
    {
      sectionTitle: 'Artist'
    },
    {
      title: 'Artist Requests',
      icon: Application,
      path: '/management/artists-request'
    },
    {
      title: 'Approved Artists',
      icon: Application,
      path: '/management/view-artists'
    },
    {
      title: 'Comments',
      icon: Application,
      path: '/management/comments'
    },
  ]
}

export default navigation
