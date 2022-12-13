import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
// import { GoogleLogin } from "react-google-login";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //to show error
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = (resp) => {
    const email = resp?.profileObj?.email; 
    const name = resp?.profileObj?.name; 
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = {email, name, token, googleId};
    dispatch(googleSignIn({result, navigate, toast}));
  }
  const googleFailure = (error) => {
    console.log(error);
    toast.error(error);
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "160px",
      }}
    >
      <MDBCard alignment="center" style={{backgroundColor: "#F2CBF2"}}>
        <MDBIcon fas icon="user-circle" className="fa-2x mt-3" />

        <h4 style={{color: "#7F167F", marginTop: "10px"}}>Sign In</h4>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your Email"
                // className="inputField"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your Password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%", backgroundColor: "#7F167F" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          {/* <GoogleLogin
            clientId="855798686196-7375ap3jn6jkj4e7sm0s72743lni3kr8.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google"/> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p style={{color: "#7F167F"}}>Don't have an account? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}


// 855798686196-7375ap3jn6jkj4e7sm0s72743lni3kr8.apps.googleusercontent.com