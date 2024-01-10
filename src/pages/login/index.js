// ** React Imports
import { useState, useEffect, useRef } from "react";
import '@css/user/login.css';

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
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import Phone from "mdi-material-ui/Phone";
import Email from "mdi-material-ui/Email";

// ** Configs
import themeConfig from "configs/themeConfig";

// ** Layout Import
import BlankLayout from "@core/layouts/BlankLayout";
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
    

    <section className="bg-color">
  <div className="container">
    <div className="row bg-white">
      <div className="col-md-5 usr-login-bg-image d-md-block">
      </div>
      <div className="col-md-7">
        <div className="usr-login-form-wrapper">
          <div className="usr-login-wrapper">
            <div className="text-center mb-5">
              <h3>Login / SignUp</h3>
              <h6>Welcome to LOOKBOOK</h6>
              <p>Please sign in to your account</p>
            </div>
            <form className="text-center">
              <TextField className="input-control mb-4" name label="Email" variant="outlined" />
              <button className="usr-login-button"  onClick={() => handleVerifyOTP()}
                   disabled={isSubmitting}>Continue</button>

            </form>
            <div className="usr-login-other-source">
              <span>or sign in using</span>
            </div>
            <div className="usr-login-social-icon">
              <a href>
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                  <path d="M15.0002 13.1582H27.1375C27.2714 13.906 27.3384 14.6203 27.3384 15.3011C27.3384 17.7229 26.8306 19.8853 25.8149 21.7882C24.7993 23.6911 23.3512 25.1783 21.4706 26.2497C19.5901 27.3211 17.4332 27.8569 15.0002 27.8569C13.248 27.8569 11.5794 27.5193 9.99463 26.844C8.40981 26.1688 7.04262 25.2564 5.89307 24.1069C4.74351 22.9573 3.83112 21.5901 3.1559 20.0053C2.48068 18.4205 2.14307 16.752 2.14307 14.9997C2.14307 13.2475 2.48068 11.579 3.1559 9.99414C3.83112 8.40932 4.74351 7.04213 5.89307 5.89258C7.04262 4.74302 8.40981 3.83064 9.99463 3.15541C11.5794 2.48019 13.248 2.14258 15.0002 2.14258C18.3484 2.14258 21.2223 3.26423 23.6219 5.50753L20.123 8.87249C18.7502 7.54436 17.0426 6.8803 15.0002 6.8803C13.5605 6.8803 12.2296 7.24302 11.0075 7.96847C9.78537 8.69392 8.81717 9.67885 8.10289 10.9233C7.3886 12.1677 7.03146 13.5265 7.03146 14.9997C7.03146 16.4729 7.3886 17.8318 8.10289 19.0762C8.81717 20.3206 9.78537 21.3055 11.0075 22.031C12.2296 22.7564 13.5605 23.1191 15.0002 23.1191C15.9712 23.1191 16.864 22.9852 17.6788 22.7174C18.4935 22.4495 19.1632 22.1147 19.6877 21.7129C20.2123 21.3111 20.6699 20.8535 21.0605 20.3401C21.4511 19.8267 21.7385 19.3412 21.9226 18.8836C22.1068 18.4261 22.2324 17.9908 22.2993 17.5778H15.0002V13.1582Z" />
                </svg>
              </a>
              <a href>
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                  <path d="M15 1.87207C7.76128 1.87207 1.87256 7.76098 1.87256 14.9994C1.87256 22.2381 7.76128 28.1272 15 28.1272C22.2383 28.1272 28.1275 22.2381 28.1275 14.9994C28.1275 7.76098 22.2383 1.87207 15 1.87207ZM18.7102 10.1591C18.7102 10.2213 18.6855 10.2809 18.6415 10.3248C18.5976 10.3688 18.538 10.3935 18.4758 10.3935L16.9835 10.3944C15.9989 10.3944 15.8189 10.7779 15.8189 11.533V13.0996H18.3783C18.4456 13.0996 18.5098 13.1286 18.5541 13.1793C18.5984 13.2299 18.619 13.2971 18.6108 13.3639L18.2464 16.1842C18.2391 16.2407 18.2114 16.2926 18.1687 16.3302C18.1259 16.3678 18.0708 16.3886 18.0139 16.3886H15.8189V23.3914C15.8189 23.4536 15.7942 23.5132 15.7503 23.5572C15.7063 23.6011 15.6467 23.6258 15.5845 23.6258H12.6726C12.6105 23.6258 12.5509 23.6011 12.5069 23.5572C12.463 23.5132 12.4383 23.4536 12.4383 23.3914V16.3886H10.2363C10.1741 16.3886 10.1145 16.3639 10.0706 16.3199C10.0266 16.276 10.0019 16.2163 10.0019 16.1542V13.3339C10.0019 13.2718 10.0266 13.2122 10.0706 13.1682C10.1145 13.1243 10.1741 13.0996 10.2363 13.0996H12.4383V11.2539C12.4383 8.80934 13.9177 7.29105 16.2996 7.29105C17.3236 7.29105 18.2285 7.36723 18.5065 7.40402C18.5629 7.41147 18.6146 7.43913 18.652 7.48185C18.6895 7.52458 18.7102 7.57946 18.7102 7.63629V10.1591Z" />
                </svg>
              </a>
              <a href>
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                  <path d="M18.3333 2H11.6667C9.89856 2 8.20286 2.68482 6.95262 3.90381C5.70238 5.12279 5 6.77609 5 8.5L5 21.5C5 23.2239 5.70238 24.8772 6.95262 26.0962C8.20286 27.3152 9.89856 28 11.6667 28H18.3333C20.1014 28 21.7971 27.3152 23.0474 26.0962C24.2976 24.8772 25 23.2239 25 21.5V8.5C25 6.77609 24.2976 5.12279 23.0474 3.90381C21.7971 2.68482 20.1014 2 18.3333 2ZM15 26.4254C14.5443 26.4254 14.1072 26.2489 13.785 25.9347C13.4627 25.6205 13.2817 25.1943 13.2817 24.75C13.2817 24.3057 13.4627 23.8795 13.785 23.5653C14.1072 23.2511 14.5443 23.0746 15 23.0746C15.4557 23.0746 15.8928 23.2511 16.215 23.5653C16.5373 23.8795 16.7183 24.3057 16.7183 24.75C16.7183 25.1943 16.5373 25.6205 16.215 25.9347C15.8928 26.2489 15.4557 26.4254 15 26.4254ZM21.6667 21.5H8.33333V8.5C8.33333 6.71006 9.82917 5.25 11.6667 5.25H18.3333C20.1692 5.25 21.6667 6.71006 21.6667 8.5V21.5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default LoginPage;
