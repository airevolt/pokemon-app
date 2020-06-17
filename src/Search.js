import React from 'react';

function Search(props) {
    return (
        <div>
            <input type="text" placeholder="Search for Pokemon" onChange={props.search} value={props.search}></input>
            <button type="submit" value="submit">Search</button>
        </div>
    );
}

export default Search;