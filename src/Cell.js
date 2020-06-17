import React from 'react';
import _ from 'lodash';

function Cell(props) {
    // capitalize first letters
    let name = props.value.name;
    name = _.startCase(name)
    // sprite of pokemon
    const image = props.value.sprites.front_default
    return (
        <table className="inner-table">
            <thead>
                <td>{name}</td>
            </thead>
            <tbody>
                <tr>
                    <div className="cell-img">
                        <img src={image}></img>
                    </div>
                    <div className="cell-data">
                        <td>Types: </td><br/>
                        <td className="type"> 
                            {props.value.types.map(current => current.type.name)
                            .join(' ')}
                        </td><br />
                        <td>Abilities: </td><br/>
                        <td className="type"> 
                            {props.value.abilities.map(current => current.ability.name)
                            .join(' ')}
                        </td>
                    </div>
                </tr>
            </tbody>    
        </table>
    );
}
export default Cell;

