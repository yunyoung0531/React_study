import { Outlet } from "react-router-dom";

function Event() {
    const images = [
        'https://dessert39.com/data/editor/2309/thumb-e7c3418def62f4b182cdac219b675cb7_1694161201_9437_835x1174.jpg',
        'https://dessert39.com/html/assets/img/menu/banner/Dbanner_13.png',
    ];
    return (
        <>
        <h1 className="festival-title">빵굿 이벤트 & 소식</h1>
            <div className='container'>
                <div className='row'>
                    {images.map((image, index) => (
                        <div className="col-md-2 row-items card-box recent-items-container" key={index}>
                            <div className='festival-item' 
                            style={{ 
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center',
                                width: '200%',  // 필요한 경우 원하는 width 값을 설정해주세요.
                                height: '200%'  // 필요한 경우 원하는 height 값을 설정해주세요.
                            }}
                        ></div>
                        </div>
                    ))}
                </div>
            </div>
        <Outlet/>
        </>
    )
}

export default Event;
