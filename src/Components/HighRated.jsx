import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { getAllGamesAPI } from '../Services/allAPI';
import { base_Url } from '../Services/base_Url';
import Button from 'react-bootstrap/esm/Button';
import { Col, Row } from 'react-bootstrap';
function HighRated() {
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
            <h5 className='ps-5 ms-4 text-white'>High Rated Games <i className="fa-solid fa-arrow-right fa-xs mx-1 pt-3"></i></h5>
                <Row className='px-5 py-3'>
                    {allGames.length > 0 ? (
                        allGames.slice(4, 6).map((item, index) => (
                            <Col md={4}>
                               <img src={item ? `${base_Url}/uploads/${item.image}` : "null"} alt="" width={'100%'} height={'300px'} style={{borderRadius:'20px'}}/>
                               <h6 className='pt-3 pb-2 text-white category'>{item.category}</h6>
                            <h5 className=' text-white'>{item.title}</h5>
                            </Col>
                        ))) : (
                        <div className="text-center">no Games found</div>
                    )
                    }
                </Row>
            </div>

    )
}

export default HighRated