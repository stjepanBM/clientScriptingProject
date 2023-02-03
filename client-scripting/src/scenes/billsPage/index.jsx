import Navbar from "components/NavBar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBills } from "state";

const Bills = () => {

    const dispatch = useDispatch();
    const { customerId } = useParams();

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
    })

    return (
        <>
            <Navbar />
            hello from bills { customerId }
        </>
    )
}


export default Bills;