import React from "react";
import "./styles.css";

const Item = (props) => (
  <li
    data-testid="todo-item"
    className={props.item.completed ? "item-completed" : ""}
  >
    {props.item.value}
    <button
      data-testid="toggle-button"
      onClick={() => props.handleToggle(props.item)}
    >
      Toggle
    </button>
    <button
      data-testid="delete-button"
      onClick={() => props.handleRemove(props.item)}
    >
      Remove
    </button>
  </li>
);

const FilterInput = (props) => (
  <input
    data-testid="filter-todo"
    onChange={props.handleFilterChange}
    value={props.inputValue}
  />
);

const List = (props) => (
  <ul data-testid="todo-list">
    {props.list.map((item) => (
      <Item
        key={item.id}
        item={item}
        handleToggle={props.handleToggle}
        handleRemove={props.handleRemove}
      />
    ))}
  </ul>
);

class Form extends React.Component {
  state = {
    inputValue: ""
  };
  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.state.inputValue;

    this.setState({ inputValue: "" });
    this.props.handleSubmit(value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          data-testid="add-todo"
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <br />
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    list: [],
    filteredList: [],
    value: ""
  };

  handleSubmit = (value) => {
    const item = {
      value,
      completed: false,
      id: `${Math.random()}-${Math.random()}`
    };
    const newList = [...this.state.list, item];
    this.setState({ list: newList });
  };

  handleToggle = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        element.completed = !element.completed;
      }
      return element;
    });
    this.setState({ list: newList });
  };

  // Challenge N.3
  handleFilterChange = (e) => {
    const filterdeList = this.state.list.filter((element) =>
      element.value.includes(e.target.value)
    );
    if (filterdeList.length > 0) {
      this.setState({ filteredList: filterdeList });
    }
  };

  // Challenge N.2
  handleRemove = (item) => {
    const newList = this.state.list.filter((element) => element.id != item.id);
    const filteredNewList = this.state.filteredList.filter(
      (element) => element.id != item.id
    );
    this.setState({ list: newList, filteredList: filteredNewList });
  };

  render() {
    return (
      <div className="App">
        <Form handleSubmit={this.handleSubmit} />

        <FilterInput
          handleFilterChange={this.handleFilterChange}
          value={this.state.inputValue}
        />
        {this.state.filteredList.length > 0 ? (
          <List
            list={this.state.filteredList}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
          />
        ) : (
          <List
            list={this.state.list}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
          />
        )}
      </div>
    );
  }
}

export default App;
