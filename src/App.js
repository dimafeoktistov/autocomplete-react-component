import React, { Component } from "react";
import "./App.css";
import Autocomplete from "./Autocomplete/Autocomplete";

class App extends Component {
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
          />
        </header>
      </div>
    );
  }
}

export default App;
