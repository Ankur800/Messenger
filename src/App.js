import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './containers/Home';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import { isLoggedInUser } from './actions';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

const App = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!auth.authenticated) {
            dispatch(isLoggedInUser());
        }
    }, []);

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
