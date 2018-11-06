import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Autocomplete.css";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: [],
    onChange() {},
    onSelect() {},
    menuStyle: {
      borderRadius: "3px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2px 0",
      fontSize: "90%",
      position: "fixed",
      overflow: "auto",
      maxHeight: "50%" // TODO: don't cheat, let it flow to the bottom
    },
    renderInput(props) {
      return <input {...props} />;
    }
  };

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  getFilteredSuggestions = props => {
    const suggestions = props.suggestions;
    const value = props.value;

    console.log(suggestions);

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    this.setState({
      ...this.state,
      filteredSuggestions
    });

    return filteredSuggestions;
  };

  renderSuggestions = props => {
    this.getFilteredSuggestions(props.suggestions).map((item, index) => {
      return <div key={index}>{item}</div>;
    });
  };

  handleChange = event => {
    this.props.onChange(event, event.target.value);

    this.setState({
      ...this.state,
      showSuggestions: true
    });
  };

  render() {
    const {
      onClick,
      onKeyDown,
      state: { activeSuggestion, filteredSuggestions, showSuggestions }
    } = this;

    let suggestionsList;

    if (showSuggestions) {
      if (filteredSuggestions.length) {
        suggestionsList = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsList = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <div style={{ ...this.props.wrapperStyle }} {...this.props.wrapperProps}>
        {this.props.renderInput({
          ...this.props.inputProps,
          autoComplete: "off",
          onFocus: this.handleInputFocus,
          onBlur: this.handleInputBlur,
          onChange: this.handleChange,
          onKeyDown: onKeyDown,
          onClick: this.onClick,
          value: this.props.value
        })}
        {this.renderSuggestions}
      </div>
    );
  }
}

export default Autocomplete;

// <input
//           type="text"
//           onChange={this.props.onChange}
//           onKeyDown={onKeyDown}
//           value={this.props.value}
//         />
