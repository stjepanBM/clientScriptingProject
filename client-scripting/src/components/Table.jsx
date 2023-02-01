import { Button } from "@mui/material";
import React from "react";

const Table = ({customers, handleEdit, handleDelete}) => {

    customers.forEach((customer, i) => {
        customer.id = i + 1;
    });


    return (
        <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer, i) => (
              <tr key={customer.id}>
                <td>{i + 1}</td>
                <td>{customer.Name}</td>
                <td>{customer.Surname}</td>
                <td>{customer.Email}</td>
                <td>{customer.CityName} </td>
                <td>{customer.StateName} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(customer.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
};