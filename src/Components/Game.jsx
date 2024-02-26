import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { getAllGamesAPI, getGamesByIdAPI } from '../Services/allAPI'
import { useNavigate, useParams } from 'react-router-dom'
function Game() {
    const [allGames, setallGames] = useState([])
    //api call
    const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
    console.log(existingUser);
    const location = useNavigate();
    const Buynow = () => {
        if (existingUser) {
            alert("Buyed successfully");
        } else {
            alert("Please Login");
            location('/login');
        }

    };
    const { id } = useParams()
    console.log(id);
    const allGame = async (id) => {

        var reqHeader = {
            "Content-Type": "multipart/form-data",
        }

        try {
            console.log(reqHeader);
            const result = await getGamesByIdAPI(id, reqHeader)
            console.log(result);
            if (result.status === 200) {
                setallGames(result.data)
                console.log(allGames);
            }
            else {
                alert("failed to retrieve project")
            }
        }
        catch (err) {
            console.log('Error Fetching projets', err);
            alert('failed to retrieve projects')
        }
    }

    useEffect(() => {
        if (id) {
            allGame(id); // Call the function with id
        }
    }, [id])
    return (
        <div style={{ backgroundColor: '#121212' }}>
            <Header />
            <Container>

                <Row className='my-5' >
                    <Col lg={8}>

                    <h1 className='text-white py-3'>{allGames.title}</h1>
                    <p className='text-white mx-2'>{allGames.rating}<i class="fa-solid fa-star px-2"></i></p>
                        <iframe
                            width="800"
                            height="600"
                            src={`https://www.youtube.com/embed/${allGames.link}&autoplay=1`}
                            style={{borderRadius:'20px'}}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>

                        <p className='text-white my-3'>{allGames.description}</p>

                    </Col>
                    <Col lg={4} style={{marginTop:"200px"}}>
                    <h1 className='text-white'>{allGames.price}</h1>
                    <Button variant="outline-light" className='mx-3 w-100 btn-lg my-2'  onClick={Buynow}>Buy Now</Button>{' '}
                    <Button variant="outline-light" className='mx-3 w-100 btn-lg my-2'  >Add to Cart</Button>{' '}
                    <Button variant="outline-light" className='mx-3 w-100 btn-lg my-2'  >Wishlist</Button>{' '}
                    </Col>
                </Row>

            </Container>

            <Footer />
        </div>
    )
}

export default Game