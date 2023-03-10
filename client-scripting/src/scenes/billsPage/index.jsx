import BillRow from "components/BillsRow";
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
        dispatch(setBills({bills: data}));
    }

    useEffect(() => {
        getBillsForCustomer();
    }, [])

    return (
        <>
            <Navbar />
            <div className="vertical-center margin-top">
                <table style={
                    {
                        width: 1200,
                        border: 1, 
                        borderStyle: "solid", 
                        borderColor: "black",
                        borderWidth: 2, 
                        borderRadius: 10, 
                    }}>
                    <thead>
                        <tr>
                            <th>BillNumber</th>
                            <th>Customer</th>
                            <th>CreditCardNumber</th>
                            <th>Seller</th>
                            <th>Comment</th>    
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            bills.map((bill) => (
                                <BillRow key={bill.Id} bill={ bill } />
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default Bills;