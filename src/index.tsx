import './index.scss';

import React from 'react';
import { render } from 'react-dom';

import { DirsContainer } from './containers/Dirs';
import DirsExplorer from './DirsExplorer';
import { register } from './serviceWorker';

// here we disable console and performance for better production experience
// console.log(process.env.NODE_ENV);
// if (!process || !process.env || process.env.NODE_ENV !== "development") {
//   performance.mark = () => undefined as any;
//   performance.measure = () => undefined as any;
//   console.log = () => undefined as any;
// }

const App = () => (
  <DirsContainer.Provider>
    <DirsExplorer />
  </DirsContainer.Provider>
);

render(<App />, document.getElementById("root"));

register();
