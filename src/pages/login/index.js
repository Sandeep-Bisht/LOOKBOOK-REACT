// ** React Imports
import { useState, useEffect, useRef } from "react";
import '@css/user/login.css';
import { MdOutlinePhoneAndroid } from "react-icons/md";
// ** Next Imports
import OtpInput from "react-otp-input";
import AuthStyle from "@core/css/auth.module.css";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import Email from "mdi-material-ui/Email";

import SocialLogin from "configs/SocialLogin";
import axios from "axios";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const LoginPage = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const redirectUrl = queryParams.get("redirectUrl");
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [signupType, setSignupType] = useState("email");
  const [otp, setOtp] = useState("");
  const [otpView, setOtpView] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [countdown, setCountdown] = useState(10); // Initial countdown value
  const mobileNumberRef = useRef(null);
  const emailRef = useRef(null);

  const handleResendOTP = () => {
    // Reset the countdown and trigger OTP resend logic
    setCountdown(10);
    // Add logic for resending OTP
    handleSignup();
    
  };

  useEffect(() => {
    let countdownInterval;

    // Start the countdown when the OTP view is active
    if (otpView && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    // Clear the interval when the component unmounts or when the OTP view is inactive
    return () => {
      clearInterval(countdownInterval);
    };
  }, [otpView, countdown]);

  const handleOnChange = (e) => {
    if (e.target.id == "mobile" && /^[0-9]{0,10}$/.test(e.target.value)) {
      setValue(e.target.value);
      setError(null);
    }
    if (e.target.id == "email") {
      setValue(e.target.value);
      setError(null);
    }
  };

  const ChangeSignupType = () => {
    setError(null);
    setValue("");
    if (signupType == "email") {
      setSignupType("mobile");
    } else {
      setSignupType("email");
    }
  };

  // Use useEffect to focus on the mobile number field after the state has been updated
  useEffect(() => {
    if (signupType === "mobile" && mobileNumberRef.current) {
      mobileNumberRef.current.focus();
    }
    if (signupType === "email" && emailRef.current) {
      emailRef.current.focus();
    }
  }, [signupType]);

  const handleSignup = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (value !== "" && ((signupType === "email" && emailRegex.test(value)) || (signupType === "mobile" && /^[0-9]{10}$/.test(value)))) {
      setIsSubmitting(true);
      await axios
        .post(`${process.env.REACT_APP_APIURL}/auth/signup`, {
          username: value,
        })
        .then((response) => {
          setError(null);
          setIsSubmitting(false);
          if (response.data && !response.data.error) {
            setOtpView(true);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError("Unable to login");
        });
    } else {
      setError("Invalid input value.");
    }
  };

  const handleVerifyOTP = async () => {
    if (otp && /^[0-9]{6}$/.test(otp)) {
      setIsSubmitting(true);
      await axios
        .post(`${process.env.REACT_APP_APIURL}/auth/signup-verify`, {
          username: value,
          otp,
        })
        .then((response) => {
          setError(null);
          setIsSubmitting(false);
          if (response.data && !response.data.error && response.data.token) {
            cookies.set("LOOKBOOK_TOKEN", response.data.token, {
              sameSite: "strict",
              path: "/",
              expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            });
            if (redirectUrl) {
              navigate(redirectUrl);
            } else {
              let token = response.data.token;
              if(token){
                let decoded = jwtDecode(token);
                if(decoded?.role == process.env.REACT_APP_SUPER_ADMIN || decoded?.role == process.env.REACT_APP_ADMIN ){
                  return navigate("/management/dashboard");
                }else{
                  navigate("/");
                }
              }
              else{
                navigate("/");
              }
            }
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError("Invalid CODE.");
        });
    } else {
      setError("Invalid CODE.");
    }
  };

  const handleOtpChange = (newValue) => {
    setError(null);
    setOtp(newValue);
  };

  return (
    <>
    <section className="bg-color">
  <div className="container">
    <div className="row bg-white background_height">
      <div className="col-md-5 usr-login-bg-image d-md-block">
      </div>
      
      {otpView ? 
              <>
              <div className="col-md-7">
        <div className="usr-login-form-wrapper">
          <div className="usr-login-wrapper"> 
          <div className="text-center mb-5">
            <h3>Enter otp</h3>
            </div>             
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Confirm your {signupType == "email" ? "email" : "number"}
                </Typography>
                <Divider sx={{ my: 5 }}></Divider>
                <Typography variant="body1">
                  Enter the code we've send via{" "}
                  {signupType == "email" ? "EMAIL" : "SMS"} to{" "}
                  {signupType == "email" ? value : `+91 ${value}`}
                </Typography>
                <Box sx={{ my: 6 }}>
                  <OtpInput
                    value={otp}
                    onChange={handleOtpChange}
                    numInputs={6}
                    inputType="number"
                    shouldAutoFocus
                    renderSeparator={
                      <span className={AuthStyle.otpSeprator}></span>
                    }
                    renderInput={(props) => (
                      <input {...props} className={AuthStyle.otpInput} />
                    )}
                  />
                  {error ? (
                    <Typography
                      variant="body2"
                      sx={{ color: "#FF3333", marginBottom: 2 }}
                    >
                      {error}
                    </Typography>
                  ) : null}
                </Box>
                <Divider sx={{ my: 5 }}></Divider>
                <Box sx={{ textAlign: "end" }}>
                      <Button
                      size="large"
                      variant="contained"
                      fullWidth
                      sx={{ marginBottom: 7 }}
                      onClick={() => handleVerifyOTP()}
                      disabled={isSubmitting}
                    >
                      verify
                    </Button>
                  <Typography
                      className="me-5"
                      size="large"
                      variant="contained"
                      sx={{ marginBottom: 7 }}
                    >
                      Not received your code? 
                      <Typography
                      className="me-5"
                      size="large"
                      variant="contained"
                      sx={{ marginBottom: 7,fontWeight:500 }}
                      onClick={handleResendOTP}
                      disabled={isSubmitting}
                    >
                      {
                        countdown > 0 ? 
                        countdown
                        :
                        ' Resend code'
                      }
                      </Typography>
                    </Typography>
                </Box>
                </div>
                </div>
                </div>
              </>
            
            :
            <>
            <div className="col-md-7">
        <div className="usr-login-form-wrapper">
          <div className="usr-login-wrapper">
            <div className="text-center mb-5">
              <h3>Login / SignUp</h3>
              <h6>Welcome to LOOKBOOK</h6>
              <p>Please sign in to your account</p>
            </div>
            <form className="text-center">

            {signupType == "email" ? (
                    <TextField
                      inputRef={emailRef}
                      autoFocus
                      onChange={(e) => handleOnChange(e)}
                      fullWidth
                      id="email"
                      value={value}
                      label="Email"
                      sx={{ marginBottom: 3 }}
                    />
                  ) : (
                    <TextField
                      inputRef={mobileNumberRef}
                      onChange={(e) => handleOnChange(e)}
                      fullWidth
                      id="mobile"
                      value={value}
                      label="Mobile No"
                      sx={{ marginBottom: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+91</InputAdornment>
                        ),
                      }}
                    />
                  )}
                  {error ? (
                    <Typography
                      variant="body2"
                      sx={{ color: "#FF3333", marginBottom: 2 }}
                    >
                      {error}
                    </Typography>
                  ) : null}
                  <Typography variant="body2" sx={{ marginBottom: 4 }}>
                    {/* Please sign-in to your account */}
                  </Typography>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ marginBottom: 7 }}
                    onClick={() => handleSignup()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "......" : "Continue "}
                  </Button>
                  <Divider sx={{ my: 5 }}>or sign in using</Divider>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SocialLogin redirectUrl={redirectUrl} />
                    {signupType == "email" ? (
                      <IconButton
                      component="a"
                      onClick={() => ChangeSignupType()}
                    >
                        <MdOutlinePhoneAndroid sx={{ color: "#8C6A54" }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        component="a"
                        onClick={() => ChangeSignupType()}
                      >
                        <Email sx={{ color: "#8C6A54" }} />
                      </IconButton>
                    )}
                  </Box>

            </form>
         
          </div>
        </div>
      </div>
      </>
            }
    </div>
  </div>
</section>
</>

  );
};

export default LoginPage;
