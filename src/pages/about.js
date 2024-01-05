import { useState, useTransition, useDeferredValue } from "react";
import { Outlet } from "react-router-dom";

// let a = new Array(10000).fill(0)

function About() {
    let [name, setName] = useState('');
    let [isPending, startTransition] = useTransition()
    let state = useDeferredValue(name);
    return (
        <>
        <h2 style={{ margin: '20px' }}>준비중입니다!</h2>

        <h4>회사 정보</h4>
        <input onChange={(e)=>{
            startTransition(()=>{
                setName(e.target.value)
            })
        }}/>
        {/* {
            isPending ? '로딩중' : 
            a.map(()=>{
                return <div>{name}</div>
            })
        } */}
        <Outlet/>
        </>
    )
}

export default About;