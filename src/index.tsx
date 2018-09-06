import * as React from "react";
import { render } from "react-dom";
import GiphyText from "./GiphyText";

const App = () => (
  <GiphyText>
    <h1>Giphy Tooltip Demo</h1>
    <h2>Just select text to get started</h2>
    <h2>Cats 🐱, dogs 🐶, and unicorns 🦄</h2>
  </GiphyText>
);

render(<App />, document.getElementById("root"));
