import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './containers/Home';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

import './App.css';

const App = () => {
    return (
        <div className='App'>
            <Router>
                {/* Only logged in user can access this home route */}
                <PrivateRoute path='/' exact component={HomePage} />

                <Route path='/login' component={LoginPage} />
                <Route path='/register' component={RegisterPage} />
            </Router>
        </div>
    );
};

export default App;
