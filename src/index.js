import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalError from './errors';

ReactDOM.render(<GlobalError><App /></GlobalError>, document.getElementById('root'));
