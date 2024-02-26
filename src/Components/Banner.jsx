import React from 'react'
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import banner from '../Assets/images/banner-1.jpg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

function Banner() {
    return (
        <div className='container pb-5 pt-3'>
            <MDBCarousel className='carousel' interval={3000} style={{ border: 'none' }}   >
                <MDBCarouselItem itemId={1} interval={3000}>
                            <img src={banner} className='d-block ms-5' alt='...' style={{ borderRadius: '20px' }} height={'550px'} width={'1200px'} />
                </MDBCarouselItem>
                <MDBCarouselItem itemId={1} interval={3000}>
                            <img src={banner} className='d-block ms-5' alt='...' style={{ borderRadius: '20px' }} height={'550px'} width={'1200px'} />
                </MDBCarouselItem>
                <MDBCarouselItem itemId={1} interval={3000}>
                            <img src={banner} className='d-block ms-5' alt='...' style={{ borderRadius: '20px' }} height={'550px'} width={'1200px'} />
                </MDBCarouselItem>
            </MDBCarousel>
        </div>
    )
}

export default Banner