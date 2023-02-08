import ItemRow from "components/ItemRow";
import Navbar from "components/NavBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setBillItems } from "state";
import Swal from "sweetalert2";

const BillItems = () => {

    const { billId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const billItems = useSelector((state) => state.billItems);
    const token = useSelector((state) => state.token);

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


    const onDeleteItem = async id => {
        console.log(id);

        const deleteCustomerResp = await fetch(`http://www.fulek.com/nks/api/aw/deleteItem`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" },
            body: JSON.stringify({
                Id: id,
            }),
          });
        const deleteResponse = await deleteCustomerResp.json();

        if(!deleteResponse.Message) {
            // getBillItems();

            Swal.fire({
                timer: 1500,
                showConfirmButton: false,
                willOpen: () =>
                {
                    Swal.showLoading();
                },
                willClose: () =>
                {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully deleted item!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    getBillItems();
                },
            });
        } else {
            Swal.fire({
                timer: 1500,
                showConfirmButton: false,
                willOpen: () =>
                {
                    Swal.showLoading();
                },
                willClose: () =>
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: deleteResponse.Message,
                        showConfirmButton: true,
                    });
                },
            });
        }


    };

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
                            <th>Product Name</th>
                            <th>Product Number</th>
                            <th>Quantity</th>
                            <th>Color</th>    
                            <th>Subcategory</th>
                            <th>Price Per Piece</th>
                            <th>Total Price</th>
                            <th align="center">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            billItems.map((item) => (
                                <ItemRow key={item.Id} item={item} onDelete={onDeleteItem} />
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )

}
export default BillItems;