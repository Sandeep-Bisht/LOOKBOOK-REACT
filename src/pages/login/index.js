// ** React Imports
import { useState } from 'react'

// ** Next Imports
import OtpInput from 'react-otp-input';
import AuthStyle from '@core/css/auth.module.css'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import Email from 'mdi-material-ui/Email'

// ** Configs
import themeConfig from 'configs/themeConfig'

// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'
import SocialLogin from 'configs/SocialLogin'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { useLocation, useNavigate } from 'react-router-dom';



// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {

  const navigate = useNavigate();

  const cookies = new Cookies();
  
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const redirectUrl = queryParams.get('redirectUrl');
  
  const [error,setError] = useState(null)
  const [value, setValue] = useState('')
  const [signupType,setSignupType] = useState('email')
  const [otp,setOtp] = useState('')
  const [otpView,setOtpView] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  


  const handleOnChange = (e) =>{

    if(e.target.id == 'mobile' && /^[0-9]{0,10}$/.test(e.target.value)){
      setValue(e.target.value)
      setError(null)
    }
    if(e.target.id == 'email'){
      setValue(e.target.value)
      setError(null)
    }
  }

  const ChangeSignupType = () =>{
    setError(null)
    setValue('')
    if(signupType == 'email'){
      setSignupType('mobile')
    }
    else{
      setSignupType('email')
    }
  }

  const handleSignup = async() =>{
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(value !== "" &&  (/^[0-9]{10}$/.test(value) || emailRegex.test(value))){
      setIsSubmitting(true);
      await axios.post(`${process.env.REACT_APP_APIURL}/auth/signup`, {
        username: value,
    })
    .then((response) => {
      setError(null)
      setIsSubmitting(false);
        if(response.data && !response.data.error){
          setOtpView(true)
        }
    })
    .catch((error) => {
      setIsSubmitting(false);
      setError("Unable to login")
    });

    }
    else{
      setError("Invalid input value.")
    }

  }

  const handleVerifyOTP = async() =>{
    if(otp && /^[0-9]{6}$/.test(otp)){
      setIsSubmitting(true);
      await axios.post(`${process.env.REACT_APP_APIURL}/auth/signup-verify`, {
        username: value,
        otp
    })
    .then((response) => {
      setError(null)
      setIsSubmitting(false);
        if(response.data && !response.data.error && response.data.token){
          cookies.set('LOOKBOOK_TOKEN',response.data.token,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
          if(redirectUrl){
            navigate(redirectUrl)
          }
          else{
            navigate('/')
          }
          
        }
    })
    .catch((error) => {
      setIsSubmitting(false);
      setError("Invalid CODE.")
    });

    }
    else{
      setError("Invalid CODE.")
    }
  }


  const handleOtpChange = (newValue) =>{
    setError(null)
    setOtp(newValue);
  }

  return (
    <BlankLayout>
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          {otpView ? <>
            <Typography
              variant='h6'
              sx={{
                textAlign:'center'
              }}
            >
              Confirm your {signupType ==  'email' ? 'email' : 'number'}
            </Typography>
            <Divider sx={{ my: 5 }}></Divider>
            <Typography
              variant='body1'
            >
              Enter the code we've send via {signupType ==  'email' ? 'EMAIL' : 'SMS'} to  {signupType ==  'email' ? value : `+91 ${value}`}
            </Typography>
            <Box sx={{ my: 6}}>
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              inputType="number"
              renderSeparator={<span className={AuthStyle.otpSeprator}></span>}
              renderInput={(props) => <input {...props}  className={AuthStyle.otpInput}/>}
            />
            {error ? <Typography variant='body2' sx={{ color: '#FF3333', marginBottom: 2 }}>{error}</Typography> : null }
            </Box>
            <Divider sx={{ my: 5 }}></Divider>
            <Box sx={{ textAlign:'end'}}>
            <Button
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => handleVerifyOTP()}
              disabled={isSubmitting}
            >
              Continue
            </Button>
            </Box>
          </> 
            :
          <>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              LOGIN / SIGNUP
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            {signupType == 'email' ? 
            <TextField autoFocus onChange={(e)=>handleOnChange(e)} fullWidth id='email' value={value} label='Email' sx={{ marginBottom: 3 }} />
            :
            <TextField autoFocus onChange={(e)=>handleOnChange(e)} fullWidth id='mobile' value={value} label='Mobile No' sx={{ marginBottom: 3 }} InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}/>
            }
            {error ? <Typography variant='body2' sx={{ color: '#FF3333', marginBottom: 2 }}>{error}</Typography> : null }
            <Typography variant='body2' sx={{ marginBottom: 4 }}>Please sign-in to your account</Typography>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => handleSignup()}
              disabled={isSubmitting}
            >
              { isSubmitting ?  '......': 'Continue ' }
            </Button>
            <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SocialLogin/>
                {signupType == 'email' ? 
                <IconButton component='a' onClick={()=>ChangeSignupType()}>
                  <Phone sx={{ color: '#8C6A54' }} />
                </IconButton>
                :
                <IconButton component='a' onClick={()=>ChangeSignupType()}>
                  <Email sx={{ color: '#8C6A54' }} />
                </IconButton>
                }
            </Box>
            
          </form>
          </>}
        </CardContent>
      </Card>
    </Box>
    </BlankLayout>
  )
}

export default LoginPage
