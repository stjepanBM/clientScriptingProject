import Navbar from "components/NavBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setBills } from "state";

const Bills = () => {

    const dispatch = useDispatch();
    const { customerId } = useParams();
    const bills = useSelector((state) => state.bills);

    const getBillsForCustomer = async () => {
        const getBillsForCustomer = await fetch(
            `http://www.fulek.com/nks/api/aw/customerbills/${customerId}`
        );
        const data = await getBillsForCustomer.json();
        console.log(data);
        dispatch(setBills({bills: data}));
    }

    useEffect(() => {
        getBillsForCustomer();
    }, [])

    return (
        <>
            <Navbar />
            
            <table>
                <tr>
                    <th>BillNumber</th>
                    <th>customer</th>
                    <th>CreditCardNumber</th>
                    <th>Seller</th>
                    <th>Comment</th>
                </tr>
                {
                    bills.map((bill) => (
                        <tr>
                            <td>{bill.BillNumber}</td>
                            <td>{bill.CustomerId}</td>
                            <td>{bill.CreditCard}</td>
                            <td>{bill.Seller}</td>
                            <td>{bill.Comment}</td>
                        </tr>
                    ))
                }
            </table>


        </>
    )
}


export default Bills;