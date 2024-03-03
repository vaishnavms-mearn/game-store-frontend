import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { getAllGamesAPI, wishlistGamesAPI } from '../../Services/allAPI';
import { base_Url } from '../../Services/base_Url';
import Button from 'react-bootstrap/esm/Button';
import { Col, Row } from 'react-bootstrap';
import useFetchAllGames from '../../Hooks/FetchAllGames';
import Animation from '../User/Animation';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function Free() {

    const allGames = useFetchAllGames();
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [userid, setUserId] = useState('');
    const [wishlistStatus, setWishlistStatus] = useState({});

    useEffect(() => {
        const existingUser = JSON.parse(sessionStorage.getItem('existingUser'));
        if (existingUser) {
            setEmail(existingUser.email);
            setUserId(existingUser._id);
            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }
        }
    }, []);


    const wishlist = async (gameId) => {
        if (token) {
            try {
                const reqBody = {
                    userId: userid,
                    gameId: gameId
                };
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                const response = await wishlistGamesAPI(gameId, reqBody, reqHeader);
                if (response.status === 200) {
                    toast.success('Added to wishlist');
                } else {
                    toast.error('Already in wishlist');
                }
            } catch (error) {
                console.log('Error adding to wishlist:', error);
                toast.error('Failed to add to wishlist');
            }
        }
        else{
            toast.error("Please Login", {
                closeButton: <Button variant="outline-light">OK</Button>,
              })
        }
    };
    Animation()
    return (
        <div className='free container py-3'>
            <Link to={'/categories'}>
                <h5 className='ps-5 ms-4 text-white'>Free Games <i className="fa-solid fa-arrow-right fa-xs mx-1 pt-3"></i></h5>
            </Link>
            <div className="d-flex justify-content-center" data-aos="fade-left" data-aos-once='true'>
                {allGames.length > 0 ? (
                    allGames.filter(item => item.price === '0').slice(0, 4).map((item, index) => (
                        <Card className='px-5' style={{ width: '50rem', backgroundColor: 'transparent', color: 'white' }}>
                            <Card.Body>
                                <Link to={`game/${item._id}`}>
                                    <Card.Img classname='card-image' variant="top" src={item ? `${base_Url}/uploads/${item.image}` : "null"} alt="" height={'300px'} width={'300px'} />
                                </Link>
                                <Card.Title className='text-white py-2'>{item.title}</Card.Title>
                                <div className="d-flex justify-content-between my-2">
                                    <Card.Subtitle className="text-white category"><p>{item.category}</p></Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-white">{item.rating} <i class="fa-solid fa-star"></i></Card.Subtitle>

                                </div>
                                <div className="d-flex justify-content-between">
                                <i className={`fa-regular fa-heart ${wishlistStatus[item._id] ? 'text-danger' : 'text-light'}`} onClick={() => wishlist(item._id)}></i>
                                    <Card.Subtitle className="mt-2 text-white">Free</Card.Subtitle>
                                </div>

                            </Card.Body>
                        </Card>
                    ))) : (
                    <div className="text-center">no Games found</div>
                )
                }
            </div>
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

    )
}

export default Free