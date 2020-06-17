import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Table from "./Table";
import Cell from './Cell'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      singleSearch: false,
      seeAll: false,
      searchedPokemon: [],
      pokemon: []
    };
    this.fetchPokemon();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async fetchPokemon() {
    for (let i=1; i<=151; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + i)
      const json = await response.json()
      this.setState({pokemon: this.state.pokemon.concat(json)})
    }
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  handleClick(event) {
    if (event.target.value === "search") {
      // handle search to show single pokemon
      let found = false;
      const pokemon = this.state.search.toLowerCase();
      this.state.pokemon.forEach((i) => {
        if (i.name === pokemon) {
          this.setState({singleSearch: true, searchedPokemon: i})
          found = true
        }
      })
      if (!found) {
        alert('pokemon not found')
      }
    }
    else {
      // handle reset
      this.setState({singleSearch: false, seeAll: false})
    }
    
  }

  render() {
    if (!this.state.pokemon) {
      return null;
    }
    return (
      <div className="App">
        <Header />
        <div className="input">
          <input type="text" placeholder="Search for Pokemon" onChange={this.handleChange} value={this.state.search}></input>
          <button type="submit" value="search" onClick={this.handleClick}>Search</button>
          <button type="submit" value="reset" onClick={this.handleClick}>Reset</button>
        </div>
        <div>
          {(!this.state.seeAll) ? <button onClick={() => this.setState({seeAll: true})}>See All</button> : <Table value={this.state.pokemon}/>}
          {(!this.state.singleSearch) ? <div /> : <Cell value={this.state.searchedPokemon} />}
        </div>
      </div>
    );
  }
}

export default App;
