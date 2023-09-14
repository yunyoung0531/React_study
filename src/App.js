import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import {Button, Container, Nav, Navbar, Spinner} from 'react-bootstrap';
import data from './data.js';
import ItemCard from './ItemCard';
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom';
// import Detail from './pages/Detail';
import About from './pages/about';
import Event from './pages/Event';
import BackgroundImage from './images/HardBoiledSurfers.png';
import axios from 'axios';
// import Cart from './pages/Cart';
import { useQuery } from 'react-query';
import './assets/fonts/fonts.css';

const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

function App() {
  let [shoes, setShoes] = useState(data);
  let [clickCnt, setClickCnt] = useState(0);
  let [loading, setLoading] = useState(false);
  let [inventory, setInventory] = useState([10, 11, 12]);
  let navigate = useNavigate();


  let [watchedItems, setWatchedItems] = useState([]);
  let watchedItemImage = localStorage.getItem('watched');
  const watchedImg = watchedItemImage ? JSON.parse(watchedItemImage).map(id => shoes[id]) : [];
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

  let result = useQuery(['userData'], ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log("요청됨");
      return a.data;
    });
  },
    { staleTime : 2000 }
)


  return (
    <div className='App'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate('/') }} className='logo-design'>Dessert</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/event') }}>Event</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
        <Nav className='ms-auto user-name'>
          안녕하세요.ㅤ 
            { result.isLoading ? '로딩중' : result.data.name}님ㅤ
          </Nav>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
      <Routes> 
        <Route path='/' element={<>
          <div className="main-bg" style={{ backgroundImage: `url(${BackgroundImage})` }} />
          <div className='watched-item'>최근에 본 상품</div>
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
          </div>
        <ItemCard shoes={shoes}/>
        {loading && <Spinner animation="border" variant="dark" />}
        <br/>
        {(clickCnt == 0 || clickCnt == 1) ? 
        <Button onClick={() => {
          //로딩중UI 띄우기
          setLoading(true);
          axios.get(clickCnt == 0 ? 'https://codingapple1.github.io/shop/data2.json' : 'https://raw.githubusercontent.com/yunyoung0531/dessert.json/master/dessert.json')
          .then((result)=>{ 
            let copy = [...shoes, ...result.data];
            setShoes(copy);
            console.log("성공");
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
        <Route path='/detail' element={<Detail shoes={shoes}/>}/>
        <Route path='/detail/:id' element={
          <Suspense fallback={<div>로딩중</div>}>
            <Detail shoes={shoes}/>
          </Suspense>
        }/>

        <Route path='/about' element={<About/>}>
          {/* Nested Routes */}
          <Route path='member' element={<>멤버</>}/>
          <Route path='location' element={<>위치</>}/>
        </Route>
        <Route path='/event' element={<Event/>}>
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
