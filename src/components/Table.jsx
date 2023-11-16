import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th className="expand">Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Email</th>
            <th>Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.name}</td>
                <td>{row.lastname}</td>
                <td className="expand">{row.address}</td>
                <td>{row.city}</td>
                <td>{row.country}</td>
                <td>{row.email}</td>
                <td>{row.number}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
                <td>
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={() => deleteRow(idx)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
