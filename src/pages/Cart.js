import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap";
import { changePlusCnt, changeMinusCnt, changeName } from "../store";
import { changeAge } from "../store";

function Cart() {

    let state = useSelector((state)=>{ return state })
    console.log(state)
    let dispatch = useDispatch();

    return (
        <>
        <h6>{state.user.name}({state.user.age})의 장바구니
        <Button onClick={()=>{
            return dispatch(changeAge(100))
        }}>버튼</Button> </h6>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.data.map((a, i) => {
                        return (
                            <tr key={i}>
                                <td>{ state.data[i].id }</td>
                                <td>{ state.data[i].name }</td>
                                <td>{ state.data[i].count }</td>
                                <td><Button onClick={()=>{
                                    dispatch(changeMinusCnt(state.data[i].id));
                                    }}>-</Button>
                                    <Button onClick={()=>{
                                    dispatch(changePlusCnt(state.data[i].id));
                                    }}>+</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table> 
        </>
    )
}
export default Cart;