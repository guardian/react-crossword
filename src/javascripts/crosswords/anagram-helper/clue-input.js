import React, { Component, createRef } from 'react';

class ClueInput extends Component {
  constructor() {
    super();
    this.inputRef = createRef(null);
  }

  componentDidMount() {
    const el = this.inputRef.current;

    if (el) {
      el.focus();
    }
  }

  componentDidUpdate() {
    const el = this.inputRef.current;

    // focus on reset
    if (this.props.value === '' && el) {
      el.focus();
    }
  }

  onInputChange(e) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    this.props.onChange(e.target.value.toLowerCase());
  }

  onKeyDown(e) {
    const el = this.inputRef.current;

    if (e.keyCode === 13 && el) {
      el.blur();
      this.props.onEnter();
    }
  }

  render() {
    return (
      <input
        type="text"
        className="crossword__anagram-helper__clue-input"
        placeholder="Enter letters"
        maxLength={this.props.clue.length}
        value={this.props.value}
        onChange={this.onInputChange.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
      />
    );
  }
}

export { ClueInput };
