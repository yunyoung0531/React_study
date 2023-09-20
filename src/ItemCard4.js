import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data.js';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ItemCard2({shoes}) {
    
    let displayDessert = shoes.slice(13, 18);

    const [showModal, setShowModal] = useState(false);
    const [selectedShoe, setSelectedShoe] = useState(null); 
    let navigate = useNavigate();

    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = (shoe) => {
        setSelectedShoe(shoe);
        setShowModal(true);
    }


    return(
        <>
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
                <img src={selectedShoe?.image} width="50%" className='modal-detail-img' />
                <h3 className='modal-detail-title'>{selectedShoe?.title}</h3>
                <p className=''>{selectedShoe?.content}</p> 
                <h5 className='price-style'>가격: {selectedShoe?.price}원</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={handleClose}>닫기</Button>
                <Button variant="outline-dark" onClick={()=>navigate(`/detail/${selectedShoe?.id}`)}>더 자세히보기</Button>
            </Modal.Footer>
        </Modal>


        <div className="container">
        <div className="row ">
        {displayDessert.map((a, i) => (
            <>
                <div className="col-md-2 row-items card-box recent-items-container"  key={a.id}>
                {/* <Link to={`/detail/${a.id}`}> */}
                    <img className='shoe-img' src={a.image} alt={a.title} />
                {/* </Link> */}
                <h5>{a.title}</h5>
                    <div className="price-button-container">
                        <p className='menu-price'>{a.price}원</p>
                        <Button variant="outline-dark" className='btn-animation2' onClick={() => handleShow(a)}>자세히보기</Button>
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