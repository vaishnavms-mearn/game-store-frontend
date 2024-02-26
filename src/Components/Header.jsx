import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon,
} from 'mdb-react-ui-kit';
import img from '../Assets/images/gamepad.png'
import { Link, useNavigate } from 'react-router-dom';
export default function Header() {
    const [openNav, setOpenNav] = useState(false);
    const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
    console.log(existingUser);
    const location = useNavigate();
    const handleLogout = () => {
        // Handle logout logic, e.g., clear session storage
        sessionStorage.removeItem('existingUser');
        location('/login')
    };
    return (
        <MDBNavbar expand='lg' style={{ backgroundColor: '#101014', padding: '20px' }}>
            <MDBContainer fluid >
                <MDBNavbarBrand href='/' className='mx-5  nav-main' style={{ color: '#e6e6ea' }} ><img
                    src={img}
                    height='50'
                    alt=''
                    className='mx-3'
                    loading='lazy'
                /><h2 className='mt-2'>Game Paradise</h2></MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenNav(!openNav)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar open={openNav}>
                    <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0 me-5'>
                        <MDBNavbarItem >
                            <MDBNavbarLink style={{ color: '#e6e6ea' }} className='mx-2' active aria-current='page' href='#' >
                                Store
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem >
                            <MDBNavbarLink href='#' className='mx-2' style={{ color: '#e6e6ea' }}>Whishlist</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem >
                            <MDBNavbarLink href='#' className='mx-2' style={{ color: '#e6e6ea' }}>Cart</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0 me-5'>

                        <MDBNavbarItem className='mx-2'>
                            {existingUser ? (
                                <button onClick={handleLogout} type="button" className="btn btn-primary signup-button px-3">
                                    <i className="fa-solid fa-sign-out fa-fade px-1"></i>Logout
                                </button>
                            ) : (
                                <Link to='/login'>
                                    <button type="button" className="btn btn-primary signup-button px-3">
                                        <i className="fa-solid fa-user fa-fade px-1"></i>Login
                                    </button>
                                </Link>
                            )}
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}