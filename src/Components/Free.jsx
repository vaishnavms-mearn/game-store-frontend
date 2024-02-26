import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { getAllGamesAPI } from '../Services/allAPI';
import { base_Url } from '../Services/base_Url';
import Button from 'react-bootstrap/esm/Button';
import { Col, Row } from 'react-bootstrap';
function Free() {
    const [allGames, setallGames] = useState([])
    //api call
    const allGame = async () => {

        var reqHeader = {
            "Content-Type": "multipart/form-data",
        }

        try {
            console.log(reqHeader);
            const result = await getAllGamesAPI(reqHeader)
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
        allGame()
    }, [])
    return (
        <div className='free container py-3'>
            <h5 className='ps-5 ms-4 text-white'>Free Games <i className="fa-solid fa-arrow-right fa-xs mx-1 pt-3"></i></h5>
            <div className="d-flex justify-content-center">
                {allGames.length > 0 ? (
                    allGames.filter(item => item.price === 'free').slice(0, 4).map((item, index) => (
                        <Card className='px-5' style={{ width: '50rem', backgroundColor: 'transparent', color: 'white' }}>
                            <Card.Body>
                                <Card.Img variant="top" src={item ? `${base_Url}/uploads/${item.image}` : "null"} alt="" height={'500px'} />
                                <Card.Title className='text-white py-2'>{item.title}</Card.Title>
                                <div className="d-flex justify-content-between my-2">
                                    <Card.Subtitle className="text-white category"><p>{item.category}</p></Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-white">{item.rating} <i class="fa-solid fa-star"></i></Card.Subtitle>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Button variant="outline-light" className='btn-sm' >Buy Now</Button>{' '}
                                    <Card.Subtitle className="mt-2 text-white">{item.price}</Card.Subtitle>
                                </div>

                            </Card.Body>
                        </Card>
                    ))) : (
                    <div className="text-center">no Games found</div>
                )
                }
            </div>
        </div>

    )
}

export default Free