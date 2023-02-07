import React, { Component } from "react";
import { Link } from "react-router-dom";


class ItemRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        return (
            <tr>
                <td>{props.item.Product.Name}</td>
                <td>{props.item.Product.ProductNumber}</td>
                <td>{props.item.Quantity}</td>
                <td>{props.item.Product.Color}</td>
                <td>{props.item.Product.ProductSubcategoryID}</td>
                <td>{props.item.PricePerPiece}</td>
                <td>{props.item.TotalPrice}</td>
            </tr>
        )
    }

}
export default ItemRow;