import React, { Component } from "react";
import { Link } from "react-router-dom";


class BillRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        return (
            <tr>
                <td>{props.bill.BillNumber}</td>
                <td>{props.bill.CustomerId}</td>
                <td>{props.bill.CreditCard}</td>
                <td>{props.bill.Seller}</td>
                <td>{props.bill.Comment}</td>
                <td><Link to={props.bill.Id + "/items"} >Items</Link></td>
            </tr>
        )
    }

}
export default BillRow;