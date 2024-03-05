import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, {FirebaseContext} from './store/FirebaseContext'

ReactDOM.render(
    <Context>
        <App />
    </Context>

, document.getElementById('root'));

