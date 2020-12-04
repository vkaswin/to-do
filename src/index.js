import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'jquery/dist/jquery'

import ToDoApp from './components/toDoApp'
import configureStore from './redux/store/configStore'

import './index.css';

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <ToDoApp></ToDoApp>
        </Provider>
    );
}

ReactDOM.render(<App></App>,document.getElementById('root'));