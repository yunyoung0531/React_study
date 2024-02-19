import { Outlet } from "react-router-dom";
import { Card } from 'react-bootstrap';

function Event({event}) {
    let displayEvent = event.slice(0, 5);

    return (
        <>
        <h1 className="festival-title event-title" >빵굿 이벤트 & 소식</h1>
        <div className='container'>
            <div className='row'>
                {displayEvent.map((a, i) => (
                    <div className="col-md-3" key={i}>
                        <Card className='event-card'>
                            <Card.Img variant="top" src={a.image} />
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
