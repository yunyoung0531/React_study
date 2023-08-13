import React, { useState } from 'react';
import chocolateCakeImage from '../images/chocolateCake.png';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Swal from "sweetalert2";


function Detail(props) {
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(1);
    let [input, setInput] = useState('');
    let [warning, setWarning] = useState(false);
    
    useEffect(()=>{
        let timer = setTimeout(()=>{ setAlert(0) }, 2000);
        console.log("let timer");
        return () => { //CleanUP-Function
            //useEffect가 실행 되기 전에 실행되는 코드
            //기존 ~는 제거 //amount시 실행됨
            console.log("CleanUP-Function");
            clearTimeout(timer);
        }
    }, [count]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            setWarning(true);
        } else {
            setInput(value);
        }
    }

    useEffect(() => {
        if (warning == true) {
            Swal.fire('숫자만 입력하세요');
            setWarning(false);
        }
    }, [warning]);

    let {id} = useParams();

    return (
        <>
        <div className="container">
        {alert == 1 ? 
        (<div className='alert alert-warning'>
            2초 이내 구매시 할인!
        </div>) : null}
            {count}
        <button onClick={()=>{ setCount(count + 1); setAlert(1) }}>버튼</button>
        <div className="row detail-item">
            <div className="col-md-6 detail-img">
            <img src={props.shoes[id].image} width="50%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5">{props.shoes[id].title}</h4>
            <input
                type='text'
                value={input}
                onChange={handleInputChange}
            />
            <button onClick={() => {setInput(1)}}>클릭</button>
            <p>{props.shoes[id].content}</p>
            <p>{props.shoes[id].price}원</p>
            <button className="btn btn-danger">주문하기</button> 
            </div>
        </div>
        </div>
        </>
    )
}

export default Detail;
