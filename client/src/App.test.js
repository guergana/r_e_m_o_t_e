import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders DSPLY element", () => {
  const { getByText } = render(<App />);
  const dsplyElement = getByText(/DSPLY/i);
  expect(dsplyElement).toBeInTheDocument();
});

test("FN button changes display", () => {
  const { getByText } = render(<App />);

  fireEvent.click(getByText(/FN/i));

  const feedBckElement = getByText(/SHADER/i, { exact: true });
  expect(feedBckElement).toBeInTheDocument();
});
