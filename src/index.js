import React from 'react';
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'jquery/dist/jquery'

import ToDoApp from './components/todoapp'

import './index.css';

const App = () => {
    return (
        <ToDoApp></ToDoApp>
    );
}

ReactDOM.render(<App></App>,document.getElementById('root'));