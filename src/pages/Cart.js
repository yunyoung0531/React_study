import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cart() {

    let state = useSelector((state)=>{ return state.data })
    console.log(state)

    return (
        <>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ㅇ</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>state[0].id</td>
                    <td>state[0].name</td>
                    <td>안녕</td>
                    <td>안녕</td>
                </tr>
            </tbody>
        </Table> 
        </>
    )
}
export default Cart;