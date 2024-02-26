import React, { useEffect, useState } from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBNavbarBrand
}
  from 'mdb-react-ui-kit';
import img from '../Assets/images/re.jpg'
import logo from '../Assets/images/gamepad.png'
import spi from '../Assets/images/spi.jpg'
import cyber from '../Assets/images/stray.jpg'
import Button from 'react-bootstrap/Button';
import cyberlogo from '../Assets/images/cyberpunk-logo.png'
import { Link, useNavigate } from 'react-router-dom';
import Animation from '../Components/Animation';
import { loginAPI, registerAPI } from '../Services/allAPI';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Auth({ register }) {

  const isRegisterFrom = register ? true : false
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const location = useNavigate();
  //register function
  const registerData = async () => {
    const { username, email, password } = userData
    if (!username || !email || !password) {
      toast.warning("Please Fill Details", {
        closeButton: <Button variant="outline-light">OK</Button>,
      })
    }
    else {
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status == 200) {
        toast.success("Register successfull", {
          // Adding an "OK" button to the toast
          closeButton: <Button variant="outline-light">OK</Button>,
          // Handle the action when the button is clicked
          onClose: () => {
            location('/login');
          }
        });
      }
      else {
        toast.warning(result.response.data, {
          closeButton: <Button variant="outline-light">OK</Button>,
        })
      }
    }
    console.log(userData);
  }
  //login function
  const loginData = async () => {
    const { email, password } = userData
    if (!email || !password) {
      toast.warning("Please Enter  Details", {
        closeButton: <Button variant="outline-light">OK</Button>,
      })
    }
    else {
      const result = await loginAPI(userData)
      console.log(result);
      if (result.status == 200) {

        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        const set = toast.success("Login successfull", {
          // Adding an "OK" button to the toast
          closeButton: <Button variant="outline-light">OK</Button>,
          // Handle the action when the button is clicked
          
          onClose: () => {
            location('/');
          }
        });
      }
      else {
        toast.error(result.response.data, {
          closeButton: <Button variant="outline-light">OK</Button>,
        })
      }
    }
  }
  Animation()
  useEffect(() => {
    document.getElementById('formControlLg').value = '';
  }, []);
  return (
    <div className="auth" >
      <MDBContainer fluid>
        <MDBRow>

          <MDBCol className='bg-black px-5' sm='6'>
            <div className='d-flex flex-row ps-5 pt-5'>
              <MDBNavbarBrand href='#' style={{ color: '#e6e6ea' }} ><img
                src={logo}
                height='50'
                alt=''
                className='me-3'
                loading='lazy'
              />    <span className="h1 fw-bold mb-0 py-5">Game Paradise</span></MDBNavbarBrand>
            </div>

            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

              <h3 className="fw-bold mb-3 ps-5 pb-3" style={{ letterSpacing: '3px', color: '#FBFEF9' }}>
                {
                  isRegisterFrom ? 'Register Here' : 'Login Here'
                }
              </h3>
              <form action="" autoComplete="off">
                {
                  isRegisterFrom &&
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' autoComplete="off" labelClass='label-class' value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} label='Name' id='formControlLg' type='name' size="lg" />
                }
                <MDBInput wrapperClass='mb-4 mx-5 w-100' autoComplete="off" labelClass='label-class' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} label='Email address' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='label-class' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} label='Password' id='formControlLg' type='password' size="lg" autoComplete="off" />
                <div>
                  {
                    isRegisterFrom ?
                      <div>
                        <button class="glow-on-hover mx-5 my-3" type="button" onClick={registerData}>Register</button>
                        <p className='ms-5'>Have an account?
                          <Link to={'/login'} style={{ textDecoration: 'none' }}>
                            <a class="link-info">Login here</a>
                          </Link></p>

                      </div>
                      :
                      <div>

                        <button class="glow-on-hover mx-5 my-3" type="button" onClick={loginData}>Login</button>
                        <Link to={'/register'} style={{ textDecoration: 'none' }}
                        >
                          <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>
                        </Link>
                      </div>
                  }
                </div>
                <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted text-white" href="#!">Forgot password?</a></p>
              </form>
            </div>

          </MDBCol>

          <MDBCol sm='6' className='d-none d-sm-block px-0' >
            {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100"  /> */}
            <MDBCarousel className='carousel' >
              <MDBCarouselItem itemId={1} interval={6000}>
                <div className="carousel-item-content" style={{ background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))' }}>
                  <img src={img} className='d-block w-100' alt='...' height={'730px'} style={{ objectFit: 'cover' }} />
                  <div className="form-overlay">
                    <div className="form-overlay-content" data-aos="fade-left" data-aos-once='true'>
                      <img src={cyberlogo} className='logo-image mx-5' height={'100px'} width={'400px'} alt="" />
                      <p className='text-white text-justify px-5'>Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.</p>
                      <div className='button mx-5'>
                        <Button variant="outline-light" className='mx-3'  >Buy Now</Button>{' '}
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCarouselItem>
              <MDBCarouselItem itemId={2} interval={5000}>
                <img src={spi} className='d-block w-100 hi' alt='...' height={'730px'} style={{ objectFit: 'cover' }} />
                <div className="form-overlay">
                  <div className="form-overlay-content" data-aos="fade-left" data-aos-once='true'>
                    <img src={cyberlogo} className='logo-image mx-5' height={'100px'} width={'400px'} alt="" />
                    <p className='text-white text-justify px-5'>Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.</p>
                    <div className='button mx-5'>
                      <Button variant="outline-light" className='mx-3'  >Buy Now</Button>{' '}
                    </div>
                  </div>
                </div>
              </MDBCarouselItem>
              <MDBCarouselItem itemId={3} interval={5000}>
                <img src={cyber} className='d-block w-100' alt='...' height={'730px'} style={{ objectFit: 'cover' }} />
              </MDBCarouselItem>
            </MDBCarousel>
          </MDBCol>

        </MDBRow>

      </MDBContainer>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Auth;