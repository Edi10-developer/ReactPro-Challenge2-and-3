import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const todos = ["buy milk", "write code", "clean my room"];

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
  it("can add items in the list", () => {
    const { getByTestId } = render(<App />);
    todos.forEach((todo) => {
      fireEvent.change(getByTestId("add-todo"), {
        target: { value: todo }
      });

      fireEvent.submit(getByTestId("add-todo"));
    });
  });
  it("can toggle done/undone", () => {
    const { getByTestId, getAllByTestId, debug } = render(<App />);

    //add items
    todos.forEach((todo) => {
      fireEvent.change(getByTestId("add-todo"), {
        target: { value: todo }
      });

      fireEvent.submit(getByTestId("add-todo"));
    });

    const toggleButtons = getAllByTestId("toggle-button");
    const items = getAllByTestId("todo-item");
    // toggle all buttons true
    toggleButtons.forEach((button) => {
      fireEvent.click(button);
    });
    // check if the item contains the class item-completed
    items.forEach((item) => {
      expect(item.classList.contains("item-completed")).toBe(true);
    });

    debug();

    // toggle all true
    toggleButtons.forEach((button) => {
      fireEvent.click(button);
    });
    // item should not contain the class item-completed
    items.forEach((item) => {
      expect(item.classList.contains("item-completed")).not.toBe(true);
    });
  });
  it("can delete an item", () => {
    const { getByTestId, getAllByTestId, debug } = render(<App />);

    //add items
    todos.forEach((todo) => {
      fireEvent.change(getByTestId("add-todo"), {
        target: { value: todo }
      });

      fireEvent.submit(getByTestId("add-todo"));
    });

    const deleteButtons = getAllByTestId("delete-button");

    deleteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(() => getAllByTestId("todo-item")).toThrow(
      'Unable to find an element by: [data-testid="todo-item"]'
    );
  });
});
