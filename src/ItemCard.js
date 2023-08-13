import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data.js';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css';

function ItemCard() {
    let [shoes] = useState(data);

    return(
        <>
        <div className="container">
        <div className="row ">
        {shoes.map((a, i) => (
            <div className="col-md-4 row-items"  key={i}>
            <Link to={`/detail/${i}`}>
                <img className='shoe-img' src={shoes[i].image}/>
            </Link>
            <h4>{shoes[i].title}</h4>
            <p>{shoes[i].price}</p>
            </div>
        ))}
        </div>
        </div>
        
        </>
    )
}

export default ItemCard;