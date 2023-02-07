import ItemRow from "components/ItemRow";
import Navbar from "components/NavBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setBillItems } from "state";

const BillItems = () => {

    const { billId } = useParams();
    const dispatch = useDispatch();
    const billItems = useSelector((state) => state.billItems);

    const getBillItems = async () => {
        const getBillsForCustomer = await fetch(
            `http://www.fulek.com/nks/api/aw/billitems/${billId}`
        );
        const data = await getBillsForCustomer.json();
        dispatch(setBillItems({billItems: data}));
    }

    useEffect(() => {
        getBillItems();
    }, []);

    return(
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
                            <th>ProductName</th>
                            <th>ProductNumber</th>
                            <th>Quantity</th>
                            <th>Color</th>    
                            <th>Subcategory</th>
                            <th>PricePerPiece</th>
                            <th>TotalPrice</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            billItems.map((item) => (
                                <ItemRow key={item.Id} item={ item } />
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )

}
export default BillItems;