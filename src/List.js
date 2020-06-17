import React from 'react';

function Table(props) {
    return (
        <table>
            <tr>
                <th> Pokemon Name</th>
            </tr>
            <tr>
                {props.value.map(current => {current.name})}
            </tr>
        </table>
    );
}

export default Table;

