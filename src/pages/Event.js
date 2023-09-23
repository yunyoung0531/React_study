import { Outlet } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';

function Event({event}) {
    let displayEvent = event.slice(0, 5);

    // const images = [
    //     'https://dessert39.com/data/editor/2309/thumb-e7c3418def62f4b182cdac219b675cb7_1694161201_9437_835x1174.jpg',
    //     'https://dessert39.com/html/assets/img/menu/banner/Dbanner_13.png',
    // ];

    return (
        <>
        <h1 className="festival-title event-title" >빵굿 이벤트 & 소식</h1>
        <div className='container'>
            <div className='row'>
                {displayEvent.map((a, i) => (
                    <div className="col-md-3" key={i}>
                        <Card style={{ width: '18rem' }} className='event-card'>
                            <Card.Img variant="top" src={a.image} /> {/* Use the current image from the map function */}
                            <Card.Body>
                                <Card.Title>{a.title}</Card.Title>
                                <Card.Text>
                                    <h4>{a.content}</h4>
                                </Card.Text>
                                
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
        <Outlet/>
        </>
    );
}

export default Event;
