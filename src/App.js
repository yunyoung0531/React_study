import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import {Button, Container, Nav, Navbar, Spinner} from 'react-bootstrap';
import './App.css';
import data from './data.js';
import eventdata from './eventdata.js';
import ItemCard from './ItemCard';
import ItemCard2 from './ItemCard2';
import ItemCard3 from './ItemCard3';
import ItemCard4 from './ItemCard4';
import { Routes, Route, useNavigate } from 'react-router-dom';
import About from './pages/about';
import Event from './pages/Event';
import BackgroundImage from './images/디저트39치즈.jpg';
import BackgroundImage2 from './images/디저트39치즈2.jpg';
import axios from 'axios';
import { useQuery } from 'react-query';
import './assets/fonts/fonts.css';
import breadlogo from './images/bread_logo.png';

const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

function App() {
  let [items, setItems] = useState(data);
  let [event, setEvent] = useState(eventdata);
  let [clickCnt, setClickCnt] = useState(0);
  let [loading, setLoading] = useState(false);
  let [inventory, setInventory] = useState([10, 11, 12]);
  let navigate = useNavigate();


  let [watchedItems, setWatchedItems] = useState([]);
  let watchedItemImage = localStorage.getItem('watched');
  const watchedImg = watchedItemImage ? JSON.parse(watchedItemImage).map(id => items[id]) : [];
  // 로컬스토리지
  //누가 Detail 페이지 접속하면
  //그 페이지에 보이는 상품id 가져와서
  //localStorage에 watched 항목에 추가
  useEffect(()=>{
    let existingWatched = localStorage.getItem('watched');
    if (!existingWatched) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
    let loadedWatchedItems = localStorage.getItem('watched');
    if (loadedWatchedItems) {
      setWatchedItems(JSON.parse(loadedWatchedItems));
    }
  }, []) 

const images = [
  'https://dessert39.com/html/assets/img/menu/banner/Dbanner_15.png',
  'https://dessert39.com/html/assets/img/menu/banner/Dbanner_13.png',
  BackgroundImage,
  BackgroundImage2
];

  return (
    <div className='App'>
      <Navbar bg="light" data-bs-theme="light" className='navbar-color'>
        <Container>
          <Nav className="me-auto nav-bar">
            <Nav.Link className='nav-marg' onClick={()=>{ navigate('/about')}}>About</Nav.Link>
            <Nav.Link className='nav-marg' onClick={()=>{ navigate('/event') }}>Event</Nav.Link>
            <Navbar.Brand onClick={()=>{ navigate('/') }} className='logo-design' >
              <img src={breadlogo} alt="빵 로고" style={{ width: '70px', height: '40px', opacity: '0.7' }} />
              <span className="logo-style" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '800' }}>빵굿</span>
            </Navbar.Brand>

            <Nav.Link className='nav-marg' onClick={()=>{ navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link className='nav-marg' onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
      <Routes> 
        <Route path='/' element={<>
          {/* <div className="main-bg" style={{ backgroundImage: `url(${BackgroundImage})` }} /> */}
          
          {/* 로컬스토리지로 최근에 본 상품 목록 */}
          {/* <div className='watched-item'>최근에 본 상품</div>
          <div className='box'>
            <ul>
            <div className="recent-items-container">
              {watchedImg.map((itemId, index) => (
                <div key={index} className="recent-item">
                  <img onClick={()=>{navigate(`/detail/${itemId.id}`)}} className="recent-item-img" src={itemId.image} style={{ width: '135px' }}/>
                  <div className="recent-item-title">{itemId.title}</div>
                </div>
              ))}
            </div>
            </ul>
          </div> */}
        
        <h2 class="festival-title">빵굿 치즈 페스티벌</h2>
        <div className='container'>
          <ul className='row'>
            {images.map((image, index) => (
                <div key={index} className='festival-item ' style={{ backgroundImage: `url(${image})` }}></div>
            ))}
          </ul>
        </div>

        <h3 class="festival-title-scone">빵굿 신메뉴 스콘</h3>
        <ItemCard items={items}/>
        {loading && <Spinner animation="border" variant="dark" />}
        <br/>

        <h3 class="festival-title-dacu">빵굿 다쿠아즈</h3>
        <ItemCard3 items={items}/>
        {loading && <Spinner animation="border" variant="dark" />}
        <br/>

        <h3 class="festival-title-oml">빵굿 오믈렛</h3>
        <ItemCard2 items={items}/>
        {loading && <Spinner animation="border" variant="dark" />}
        <br/>

        <h3 class="festival-title-oml">빵굿 도쿄롤</h3>
        <ItemCard4 items={items}/>
        {loading && <Spinner animation="border" variant="dark" />}
        <br/>


        {/* 메뉴 더 있을 경우 버튼 누르면 더 보여줌 */}
        {(clickCnt == 0 || clickCnt == 1) ? 
        <Button variant="outline-dark" onClick={() => {
          //로딩중UI 띄우기
          setLoading(true);
          axios.get(clickCnt == 0 ? 'https://raw.githubusercontent.com/yunyoung0531/dessert.json/master/dessert.json' : 'https://raw.githubusercontent.com/yunyoung0531/dessert.json/master/dessert.json')
          .then((result)=>{ 
            let copy = [...items, ...result.data];
            setItems(copy);
            console.log("더보기 클릭!");
            //로딩중UI 숨기기
            setLoading(false);
            setClickCnt(clickCnt + 1);
          })
          .catch(()=>{
            console.log('실패')
            setLoading(false);
            //로딩중UI 숨기기
          })
        }}>버튼</Button> : null}

        </>}/>


        {/* URL파라미터 */}
        <Route path='/detail' element={<Detail items={items}/>}/>
        <Route path='/detail/:id' element={
          <Suspense fallback={<div>로딩중</div>}>
            <Detail items={items}/>
          </Suspense>
        }/>

        <Route path='/about' element={<About/>}>
          {/* Nested Routes */}
          <Route path='member' element={<>멤버</>}/>
          <Route path='location' element={<>위치</>}/>
        </Route>
        <Route path='/event' element={<Event event={event}/>}>
          {/* Nested Routes */}
          <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>}/>
          <Route path='two' element={<p>생일 기념 쿠폰</p>}/>
          <Route/>
        </Route>
        <Route path='*' element={<>404</>}/>

        <Route path="/cart" element={
          <Suspense fallback={<div>로딩중</div>}>
            <Cart/>
          </Suspense>
        }/>
      </Routes>
      </Suspense>

    </div>
  );
}

export default App;
