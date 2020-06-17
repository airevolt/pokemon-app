import React from 'react';
import Cell from './Cell'
import "./App.css";

function Table(props) {
    return (
        <table align="center">
            <thead>
                <tr> 
                    <th> Kanto Pokemon </th>
                </tr>
            </thead>   
            <tbody>
                   {props.value.map(current => <tr><Cell value={current}/></tr>)}  
            </tbody>
        </table>
    );
}
export default Table;
