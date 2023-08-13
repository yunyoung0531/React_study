import { Outlet } from "react-router-dom";

function About() {
    return (
        <>
        <h4>회사 정보</h4>
        <Outlet/>
        </>
    )
}

export default About;