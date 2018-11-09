import React, { Component } from "react";
import "./App.css";
import Autocomplete from "./Autocomplete/Autocomplete";

class App extends Component {
  state = {
    item: ""
  };

  getItem = item => {
    this.setState({
      item
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Autocomplete
            suggestions={[
              "Корова",
              "Собака",
              "Буйвол",
              "Банан",
              "Воробей",
              "Крокодил",
              "Рептилия",
              "Акула",
              "Хвост",
              "Папоротник"
            ]}
            getItem={this.getItem}
          />
        </header>
      </div>
    );
  }
}

export default App;
