import React from 'react';
import "./App.css";
// bootstrap
import { MDBBtn, MDBDataTable, MDBPopover, MDBPopoverBody, MDBTooltip } from 'mdbreact';
import _ from 'lodash'; // to capitalize the first letter of every pokemon (yes I am lazy)
import catchImg from "./pokeball.png";
import releaseImg from "./openball.png";

function Table(props) {
    let buttonImg;
    let btnColor;
    let tooltip;
    let isInCollection = true;

    if (props.inCollection) {
        buttonImg = <img src={releaseImg} />
        btnColor = 'light'
        tooltip = <div>Remove from Collection</div>
    }
    else {
        buttonImg = <img src={catchImg} />
        btnColor = 'amber'
        tooltip = <div>Add to Collection</div>
        isInCollection = false
    }
    // data for datatable
    let data = {
        // columns for table
        columns: [
            {
                label: '',
                field: 'add'
            },
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
    /*
    take e.target.id(links to index of pokemon we ant to add)
    collection = props.value[e.target.id]
    */
    props.value.forEach(pokemon => {
        const name = _.startCase(pokemon.name); // name
        const bulbapedia = "https://bulbapedia.bulbagarden.net/wiki/" + name; // link for picture to more information
        let pokeObj = {
            add: <MDBTooltip placement="top">
                    <MDBBtn id="collectionBtn" onClick={() => props.sendData({currentPokemon:pokemon, inCollection: isInCollection})} color={btnColor} size="sm">
                        {buttonImg}
                    </MDBBtn>
                    <div>{tooltip}</div>
                 </MDBTooltip>,
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
            // moves are shown with a bootstrap popover with li elements, a max height css property
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
        data.rows.push(pokeObj) // the new pokemon obj gets put into the rows array
    })

    return (
        <MDBDataTable className="table"
            hover
            striped
            sorting="false"
            data={data}
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