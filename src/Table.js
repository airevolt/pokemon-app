import React from 'react';
import "./App.css";
// bootstrap
import { MDBBtn, MDBDataTable, MDBPopover, MDBPopoverBody  } from 'mdbreact';
import _ from 'lodash'; // to capitalize the first letter of every pokemon (yes I am lazy)

function Table(props) {
    // columns for table
    let data = {
        columns: [
            {
                label: 'Picture',
                field: 'picture'
            },
            {
                label: '#',
                field: 'id'
            },
            {
                label: 'Name',
                field: 'name'
            },
            {
                label: 'Type',
                field: 'type'
            },
            {
                label: 'Abilities',
                field: 'abilities'
            },
            {
                label: 'Moves',
                field: 'moves'
            }
        ],
        // rows for table
        rows: []
    }
    // loops over each pokemon and sets the values associated to our table into a new object
    // and then pushes that new object into the row array
    props.value.forEach(pokemon => {
        const name = _.startCase(pokemon.name);
        const bulbapedia = "https://bulbapedia.bulbagarden.net/wiki/" + name;
        let obj = {
            picture: <a href={bulbapedia} target="_blank"><img src={pokemon.sprites.front_default} /></a>,
            id: pokemon.id,
            name: name,
            // types are shown with a  bootstrap popover with p elements that show on click 
            type: <MDBPopover placement="top" popover clickable id="popper1">
                        <MDBBtn color="info" size="sm">See Types</MDBBtn>
                            <div>
                                <MDBPopoverBody>
                                    {pokemon.types.map(type => <p>{type.type.name}</p>)}
                                </MDBPopoverBody>
                            </div>
                  </MDBPopover>,
            // abilities are shown with a  bootstrap popover with p elements that show on click 
            abilities: <MDBPopover placement="top" popover clickable id="popper1">
                                <MDBBtn color="info" size="sm">See Abilities</MDBBtn>
                                    <div>
                                        <MDBPopoverBody>
                                            {pokemon.abilities.map(ability => <p>{ability.ability.name}</p>)}
                                        </MDBPopoverBody>
                                    </div>
                        </MDBPopover>,
            // moves are shown with a bootstrap popover with li elements and a max height css property
            // and overflow auto so it is scrollable on long movesets
            moves: <MDBPopover placement="top" popover clickable id="popper1">
                            <MDBBtn color="info" size="sm">See Moveset</MDBBtn>
                                <div className="moves-scroll">
                                    <MDBPopoverBody>
                                        {pokemon.moves.map(move => <li>{move.move.name}</li>)}
                                    </MDBPopoverBody>
                                </div>
                    </MDBPopover>,
        }
        data.rows.push(obj)
    })

    return (
        <MDBDataTable className="table"
            hover
            striped
            data={data}
            sorting={false}
            />

    );
}
export default Table;

       {/* <MDBTable>
            <MDBTableHead columns={columns} />
            <MDBTableBody rows={rows} />
        </MDBTable> */}
// function Table(props) {
//     return (
//         <table align="center">
//             <thead>
//                 <tr> 
//                     <th> Kanto Pokemon </th>
//                 </tr>
//             </thead>   
//             <tbody>
//                    {props.value.map(current => <tr><Cell value={current}/></tr>)}  
//             </tbody>
//         </table>
//     );
// }