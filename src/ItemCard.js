import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data.js';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function ItemCard({shoes}) {
    let displayDessert = shoes.slice(0, 5);

    return(
        <>
        <div className="container">
        <div className="row ">
        {displayDessert.map((a, i) => (
            <>
            <div className="col-md-2 row-items card-box recent-items-container"  key={i}>
            <Link to={`/detail/${i}`}>
                <img className='shoe-img' src={shoes[i].image}/>
            </Link>
            <h4>{shoes[i].title}</h4>
                <div className="price-button-container">
                    <p className='menu-price'>{shoes[i].price}</p>
                    <div className='menu-more'><Button variant="outline-dark" className='btn-animation btn-bubble'>자세히보기</Button></div>
                </div>
            </div>
            </>
        ))}
        </div>
        </div>
        
        </>

        
    )
}

export default ItemCard;