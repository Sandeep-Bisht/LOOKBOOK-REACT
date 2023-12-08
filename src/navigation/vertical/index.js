// ** Icon imports
import Login from 'mdi-material-ui/Login'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

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
      icon: CreditCardOutline,
      path: '/management/services'
    },
    {
      title: 'Products',
      icon: CreditCardOutline,
      path: '/management/products'
    },
    {
      title: 'Blog',
      icon: Login,
      path: '/management/create-blog'
    },
  ]
}

export default navigation
