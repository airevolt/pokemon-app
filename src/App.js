import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Table from "./Table";
import { MDBBtn, MDBInput } from "mdbreact"; // bootstrap components

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
    for (let i=1; i<=807; i++) {
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
          this.setState({singleSearch: true, searchedPokemon: [i]})
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
          <MDBInput label="Search for Pokemon" type="text" onChange={this.handleChange} value={this.state.search} />
          <MDBBtn color="success" type="submit" value="search" onClick={this.handleClick}>Search</MDBBtn>
          <MDBBtn color="elegant" type="submit" value="reset" onClick={this.handleClick}>Reset</MDBBtn>
        </div>
        <div>
          {(!this.state.singleSearch) ? <div /> 
            : <Table value={this.state.searchedPokemon} />}
          {(!this.state.seeAll) ? <MDBBtn color="info" onClick={() => this.setState({seeAll: true})}>See All</MDBBtn> 
            : <Table value={this.state.pokemon}/>}
        </div>
      </div>
    );
  }
}

export default App;

// To pass data from child component to parent component

// In Parent Component:

// getData(val){
//     // do not forget to bind getData in constructor
//     console.log(val);
// }
// render(){
//  return(<Child sendData={this.getData}/>);
// }
// In Child Component:

// demoMethod(){
//    this.props.sendData(value);
//  }
