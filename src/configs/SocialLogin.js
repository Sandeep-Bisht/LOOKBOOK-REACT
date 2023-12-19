
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';


// MUI Imports

import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import Facebook from 'mdi-material-ui/Facebook'
import Google from 'mdi-material-ui/Google'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


const SocialLogin = ({redirectUrl}) => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const [SocialLoginComponents, setSocialLoginComponents] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          import('reactjs-social-login').then((module) => {
            const { LoginSocialFacebook, LoginSocialGoogle } = module;
            setSocialLoginComponents({ LoginSocialFacebook, LoginSocialGoogle });
          });
        }
      }, []);

  return (
    <>
    {SocialLoginComponents ? (
        <>
        <SocialLoginComponents.LoginSocialFacebook
            appId={process.env.REACT_APP_FACEBOOKAPPID} 

            onResolve={async({data}) => {
                await axios.post(`${process.env.REACT_APP_APIURL}/auth/facebook`, {
                accessToken: data.accessToken,
                userID:data.userID,
              })
              .then((response) => {
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
                console.log('error logged in by facebook')
              });
            }} 

            onReject={(error)=>{console.log(error,'rejected by facebook')}}
          >
            <IconButton component='a'>
                <Facebook sx={{ color: '#497ce2' }} />
            </IconButton>
        </SocialLoginComponents.LoginSocialFacebook>


        <SocialLoginComponents.LoginSocialGoogle
          client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={async ({data}) => {
                    await axios.post(`${process.env.REACT_APP_APIURL}/auth/google`, {
                        code: data.code,
                    })
                    .then((response) => {
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
                        console.log(error,'error is this')
                        console.log('error logged in by google')
                    });
              }}

          onReject={err => {console.log(err,"rejected by google")}}
          >
            <IconButton component='a'>
                <Google sx={{ color: '#db4437' }} />
            </IconButton>
        </SocialLoginComponents.LoginSocialGoogle>
        </>
      ) : 
      <>
      <IconButton component='a'>
            <Facebook sx={{ color: '#497ce2' }} />
            </IconButton>
      <IconButton component='a'>
            <Google sx={{ color: '#db4437' }} />
        </IconButton>
        </>
      }
</>
  )
}

export default SocialLogin