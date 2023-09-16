import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data.js';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function ItemCard2({shoes}) {
    // let displayItems = data.filter(item => item.id === 5 || item.id === 6 || item.id === 7);
    let displayDessert = shoes.slice(5, 9);


    return(
        <>
        <div className="container">
        <div className="row ">
        {displayDessert.map((a, i) => (
            <>
                <div className="col-md-2 row-items card-box recent-items-container"  key={a.id}>
                <Link to={`/detail/${a.id}`}>
                    <img className='shoe-img' src={a.image} alt={a.title} />
                </Link>
                <h5>{a.title}</h5>
                    <div className="price-button-container">
                        <p className='menu-price'>{a.price}원</p>
                        <Button variant="outline-dark" className='btn-animation2'>자세히보기</Button>
                    </div>
                </div>
            </>
        ))}
        </div>
        </div>
        
        </>

        
    )
}

export default ItemCard2;