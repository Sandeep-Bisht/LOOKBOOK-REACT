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
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/management/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/',
      openInNewTab: true
    },
    {
      title: 'Create Profile',
      icon: AccountPlusOutline,
      path: '/management/create-profile',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/management/cards'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/management/form-layouts'
    }
  ]
}

export default navigation
