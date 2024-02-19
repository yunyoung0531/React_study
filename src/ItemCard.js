import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data.js';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ItemCard({items}) {
    let displayDessert = items.slice(0, 5);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    let navigate = useNavigate();

    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    }

    return (
        <>
        <Modal show={showModal} onHide={handleClose} centered className='modal-shoe-detail'>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center justify-content-center ">
                <img src={selectedItem?.image} width="50%" className='modal-detail-img' />
                <h3>{selectedItem?.title}</h3>
                <p className=''>{selectedItem?.content}</p> 
                <h5 className='price-style'>가격: {selectedItem?.price}원</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={handleClose}>닫기</Button>
                <Button variant="outline-dark" onClick={()=>navigate(`/detail/${selectedItem?.id}`)}>더 자세히보기</Button>
            </Modal.Footer>
        </Modal>


        <div className="container">
            <div className="row ">
            {displayDessert.map((a, i) => (
                <div className="col-md-2 row-items card-box recent-items-container"  key={i}>
                        <img className='shoe-img' src={items[i].image} alt="Item Image" />
                    <h5>{items[i].title}</h5>
                    <div className="price-button-container">
                        <p className='menu-price'>{items[i].price}원</p>
                        <Button variant="outline-dark" className='btn-animation2' onClick={() => handleShow(items[i])}>자세히보기</Button>
                    </div>
                </div>
            ))}
            </div>
        </div>
        </>
    )
}

export default ItemCard;
