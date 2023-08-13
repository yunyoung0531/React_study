import { Outlet } from "react-router-dom";

function Event() {
    return (
        <>
        <h3>오늘의 이벤트</h3>
        <Outlet/>
        </>
    )
}

export default Event;