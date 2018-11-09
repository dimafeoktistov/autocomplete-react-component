import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./Autocomplete.css";

class Autocomplete extends Component {
  static propTypes = {
    // Use this props to add items to autocomplete
    suggestions: PropTypes.array,
    // Use this props to set up props for an input, such as placeholder for example
    inputProps: PropTypes.object,
    // Used to get items that was selected by user
    getItem: PropTypes.func.isRequired,
    // Used to define styles of input if you don't want to use it as class
    inputStyles: PropTypes.object,
    // Used to customize class of input
    inputClass: PropTypes.string,
    // Used to customize classes of the list
    listClasses: PropTypes.objectOf(PropTypes.string)
  };

  static defaultProps = {
    inputProps: {},
    inputClass: "",
    listClasses: {
      suggestionList: "suggestions",
      activeSuggestion: "suggestion-active"
    }
  };

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ""
  };

  onChange = e => {
    const { suggestions, getItem } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
    getItem(userInput);
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.target.innerText
    });

    const { getItem } = this.props;
    getItem(e.target.innerText);
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const { getItem } = this.props;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      getItem(filteredSuggestions[activeSuggestion]);
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
      onChange,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsList;

    if (showSuggestions) {
      if (filteredSuggestions.length) {
        suggestionsList = (
          <ul className={this.props.listClasses.suggestionList}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = this.props.listClasses.activeSuggestion;
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
        suggestionsList = null;
      }
    }

    return (
      <Fragment>
        <input
          {...this.props.inputProps}
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          autoComplete="off"
          className={this.props.inputClass}
          style={{ ...this.props.inputStyles }}
        />
        {suggestionsList}
      </Fragment>
    );
  }
}

export default Autocomplete;
