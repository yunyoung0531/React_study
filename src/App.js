import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import data from './data.js';
import ItemCard from './ItemCard';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import About from './pages/about';
import Event from './pages/Event';
import BackgroundImage from './images/HardBoiledSurfers.png';
import axios from 'axios';

function App() {

  let [shoes] = useState(data);
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
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
        <Button onClick={() => {
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{ console.log(result.data) 
          }).catch(()=>{
            console.log('실패')
          })
        }}>버튼</Button>
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
          <Route path='two' element={<p>생일 기념 쿠폰 받기</p>}/>
          <Route/>
        </Route>
        <Route path='*' element={<>404</>}/>
      </Routes>


    </div>
  );
}

export default App;
