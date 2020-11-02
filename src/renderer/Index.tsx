import { h, render } from 'preact';

import App from './App';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

render(<App />, mainElement);
