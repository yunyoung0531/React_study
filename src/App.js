import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {Button, Container, Nav, Navbar, Spinner} from 'react-bootstrap';
import data from './data.js';
import ItemCard from './ItemCard';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import About from './pages/about';
import Event from './pages/Event';
import BackgroundImage from './images/HardBoiledSurfers.png';
import axios from 'axios';
import Cart from './pages/Cart';

function App() {

  let [shoes, setShoes] = useState(data);
  let [clickCnt, setClickCnt] = useState(0);
  let [loading, setLoading] = useState(false);
  let [inventory, setInventory] = useState([10, 11, 12]);
  let navigate = useNavigate();
  
  return (
    <div className='App'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate('/') }}>Dessert</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/event') }}>Event</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail/0') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<>
          <div className="main-bg" style={{ backgroundImage: `url(${BackgroundImage})` }} />
        <ItemCard shoes={shoes}/>
        {loading && <Spinner animation="border" variant="dark" />}
        <br/>
        {(clickCnt == 0 || clickCnt == 1) ? 
        <Button onClick={() => {
          //로딩중UI 띄우기
          setLoading(true);
          axios.get(clickCnt == 0 ? 'https://codingapple1.github.io/shop/data2.json' : 'https://codingapple1.github.io/shop/data3.json')
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
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>

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

        <Route path="/cart" element={<Cart/>}/>
      </Routes>


    </div>
  );
}

export default App;
