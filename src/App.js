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
      showCollection: false,
      searchedPokemon: [],
      pokemon: [],
      collection: []
    };
    this.fetchPokemon();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCollection = this.getCollection.bind(this);
  }

  getCollection(val) {
    let pokemon = val.currentPokemon
    console.log(pokemon)
    let deletePokemon = val.inCollection
    console.log(deletePokemon)
    // check if pokemon already in collection
    if (deletePokemon) {
      this.setState({collection: this.state.collection.filter(el => el.name !== pokemon.name)})
    } else {
      if (this.state.collection.indexOf(pokemon) === -1){
        // add to collection
        this.setState({collection: this.state.collection.concat(pokemon)})
      }
      else {
        // pokemon already in collection
        alert("Pokemon already in collection")
      }
    }
    

  }

  // get pokemon data on startup
  // 807 is currently the last pokemon in pokeapi
  async fetchPokemon() {
    for (let i=1; i<=807; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + i)
      const json = await response.json()
      this.setState({pokemon: this.state.pokemon.concat(json)})
    }
  }

  // sets our search criteria as we type in the search bar
  handleChange(event) {
    this.setState({search: event.target.value});
  }

  // check if we click the search button or the reset button
  // sets the state to with the found pokemon or outputs an alert saying not found
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
      this.setState(
        {
          singleSearch: false, 
          seeAll: false, 
          showCollection: false
        }
      )
    }
    
  }

  render() {
    if (!this.state.pokemon) {
      return null;
    }
    // have we search for a pokemon?
    let searchResults;
    if (!this.state.singleSearch) {
      searchResults = <div />
    } else {
      searchResults = <Table value={this.state.searchedPokemon} sendData={this.getCollection} />
    }
    // do we want to see our collection or all the pokemon
    let collectionOrSeeAll;
    if (!this.state.seeAll && !this.state.showCollection) {
      collectionOrSeeAll = 
        <div>
          <MDBBtn color="info" onClick={() => this.setState({seeAll: true, showCollection: false})}>See All</MDBBtn>
          <MDBBtn color="amber" onClick={() => this.setState({showCollection: true, seeAll: false})}>Show Collection</MDBBtn>
        </div>
    } else if (this.state.seeAll && !this.state.showCollection) {
      collectionOrSeeAll = 
        <div>
          <MDBBtn color="amber" onClick={() => this.setState({showCollection: true, seeAll: false})}>Show Collection</MDBBtn> 
          <Table value={this.state.pokemon} sendData={this.getCollection} />
        </div>
    } else {
      collectionOrSeeAll = 
        <div>
          <MDBBtn color="info" onClick={() => this.setState({seeAll: true, showCollection: false})}>See All</MDBBtn> 
          <Table value={this.state.collection} inCollection="true" sendData={this.getCollection} />
        </div>
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
          {searchResults}
          {collectionOrSeeAll}
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
