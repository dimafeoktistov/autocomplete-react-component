import React, { Component } from "react";
import "./App.css";
import Autocomplete from "./Autocomplete/Autocomplete";

class App extends Component {
  state = {
    value: ""
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
              "Ежик",
              "Воробей",
              "Крокодил",
              "Рептилия",
              "Акула",
              "Хвост",
              "Папоротник"
            ]}
            onChange={e => this.setState({ value: e.target.value })}
            onSelect={value => this.setState({ value })}
            value={this.state.value}
          />
        </header>
      </div>
    );
  }
}

export default App;
