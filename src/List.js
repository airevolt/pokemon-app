/*
            NOT USING ANYMORE
*/
import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

function Table(props) {
    return (
        <MDBTable>
            <MDBTableHead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Abilities</th>
                    <th>Moves</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
            </MDBTableBody>
            <tr>
                {props.value.map(current => {current.name})}
            </tr>
        </MDBTable>
    );
}

export default Table;


// function Table(props) {
//     return (
//         <MDBTable>
//             <tr>
//                 <th> Pokemon Name</th>
//             </tr>
//             <tr>
//                 {props.value.map(current => {current.name})}
//             </tr>
//         </MDBTable>
//     );
// }

