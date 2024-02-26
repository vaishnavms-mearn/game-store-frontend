import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { getAllGamesAPI } from '../Services/allAPI';
import { base_Url } from '../Services/base_Url';
import filterListData from '../../src/Assets/js/filterListData';
import { Col, Container, Row } from 'react-bootstrap';

function Categories() {
    const [filters, setFilters] = useState(filterListData);
    const [allGames, setAllGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const reqHeader = { "Content-Type": "multipart/form-data" };
                const result = await getAllGamesAPI(reqHeader);
                if (result.status === 200) {
                    setAllGames(result.data);
                    setFilteredGames(result.data); // Initially display all games
                } else {
                    alert("Failed to retrieve games");
                }
            } catch (err) {
                console.log('Error Fetching games', err);
                alert('Failed to retrieve games');
            }
        };

        fetchGames();
    }, []);

    const handleFilterGames = category => {
        if (category === 'All') {
            setFilteredGames(allGames); // Display all games
        } else {
            const filtered = allGames.filter(item => item.category === category);
            setFilteredGames(filtered);
        }

        // Update filter state to mark the active category
        setFilters(prevFilters =>
            prevFilters.map(filter => ({
                ...filter,
                active: filter.name === category,
            }))
        );
    };

    return (
        <div>
            <Header />
            <div className="categories" style={{ backgroundColor: '#121212' }}>
                <div className="container row">
                    <div className="col-lg-8">
                        <ul className='filters'>
                            {filters.map(filter => (
                                <li
                                    key={filter._id}
                                    className={`${filter.active ? 'actives' : undefined}`}
                                    onClick={() => handleFilterGames(filter.name)}
                                >
                                    {filter.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="container">
                <Row>
                    {filteredGames.length > 0 ? (
                        filteredGames.map((item, index) => (
                                <Col lg={4} className='pxx-5'>
                                    <Card key={index} className='px-5 ' style={{ width: '28rem', backgroundColor: 'transparent', color: 'white' }}>
                                        <Card.Body>
                                            <Card.Img variant="top" src={item ? `${base_Url}/uploads/${item.image}` : "null"} alt="" height={'370px'} />
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
                                </Col>
                        ))
                    ) : (
                        <div className="text-center">No Games found</div>
                    )}
                </Row>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Categories;
