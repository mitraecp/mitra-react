export const defaultFiles = {
  '/index.html': {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    hidden: true,
  },
  '/index.js': {
    code: `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));`,
    active: true,
  },
  '/App.js': {
    code: `import React, { useState } from "react";
import "./styles.css";
import { Counter } from "./components/Counter";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Mitra React</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Counter />
    </div>
  );
}`,
  },
  '/styles.css': {
    code: `.App {
  font-family: sans-serif;
  text-align: center;
  padding: 20px;
}

button {
  margin: 0 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0051a2;
}`,
  },
  '/components/Counter.js': {
    code: `import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Counter: {count}</h3>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`,
  },
  '/package.json': {
    code: `{
  "name": "mitra-react-sandbox",
  "version": "1.0.0",
  "description": "React sandbox for Mitra",
  "main": "index.js",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
    hidden: true,
  },
};
